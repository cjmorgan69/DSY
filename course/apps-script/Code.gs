/**
 * Course App backend for Google Sheets.
 * Paste this whole file into Extensions > Apps Script (replace anything there), save,
 * then reload the sheet and use the Course App menu. Full steps are in the README.
 */

/* ---------------------------------------------------------------------------
 * Core rules: bookings, attendance and progress.
 * The same code runs in the sheet (real data) and in the app's demo mode.
 * `db` is a small storage interface: rows, append, update, today, now, newId.
 * ------------------------------------------------------------------------- */
var Core = (function () {
  'use strict';

  function fail(message) {
    var e = new Error(message);
    e.userFacing = true;
    throw e;
  }
  function s(v) { return v == null ? '' : String(v).trim(); }
  function isActive(student) {
    var v = s(student.status).toLowerCase();
    return v === '' || v === 'active';
  }
  function byWhen(a, b) {
    var ka = (a.date || '9999') + ' ' + (a.start_time || '');
    var kb = (b.date || '9999') + ' ' + (b.start_time || '');
    return ka < kb ? -1 : ka > kb ? 1 : 0;
  }
  function byDay(a, b) {
    var na = parseFloat(a), nb = parseFloat(b);
    if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
    return String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0;
  }

  function load(db) {
    var d = {
      today: db.today(),
      students: db.rows('Students').filter(function (r) { return s(r.student_id); }),
      workshops: db.rows('Workshops').filter(function (r) { return s(r.workshop_id); }).sort(byWhen),
      bookings: db.rows('Bookings').filter(function (r) { return s(r.student_id) && s(r.workshop_id); }),
      attendance: db.rows('Attendance').filter(function (r) { return s(r.student_id) && s(r.workshop_id); }),
      unavailable: (db.rows('Unavailable') || []).filter(function (r) { return s(r.student_id) && s(r.day_number); })
    };
    d.studentById = {};
    d.students.forEach(function (st) { d.studentById[s(st.student_id)] = st; });
    d.workshopById = {};
    d.workshops.forEach(function (w) { d.workshopById[s(w.workshop_id)] = w; });
    d.att = {}; // "student|workshop" -> attendance row (latest wins)
    d.attendance.forEach(function (a) { d.att[s(a.student_id) + '|' + s(a.workshop_id)] = a; });
    d.booking = {}; // "student|workshop" -> booking row (latest wins)
    d.bookings.forEach(function (b) { d.booking[s(b.student_id) + '|' + s(b.workshop_id)] = b; });
    d.na = {}; // "student|day" -> can't-make-it row (latest wins)
    d.unavailable.forEach(function (r) { d.na[s(r.student_id) + '|' + s(r.day_number)] = r; });
    return d;
  }

  /* A student's open note that they cannot make any of a day's dates, or null. */
  function naOpen(d, studentId, day) {
    var r = d.na[studentId + '|' + day];
    return r && s(r.status).toLowerCase() === 'open' ? r : null;
  }
  function dayName(d, cohort, day) {
    var w = cohortWorkshops(d, cohort).filter(function (x) { return s(x.day_number) === day && s(x.workshop_name); })[0];
    return w ? s(w.workshop_name) : '';
  }

  function isBooked(d, studentId, workshopId) {
    var b = d.booking[studentId + '|' + workshopId];
    return !!b && s(b.status).toLowerCase() === 'confirmed';
  }
  function attStatus(d, studentId, workshopId) {
    var a = d.att[studentId + '|' + workshopId];
    var v = a ? s(a.status).toLowerCase() : '';
    return v === 'present' || v === 'absent' ? v : null;
  }
  function isPast(d, w) { return !!w.date && w.date < d.today; }
  function sameCohort(a, b) { return s(a).toLowerCase() === s(b).toLowerCase(); }

  function cohortWorkshops(d, cohort) {
    return d.workshops.filter(function (w) { return sameCohort(w.cohort, cohort); });
  }
  function bookedCount(d, w) {
    var id = s(w.workshop_id), n = 0;
    d.students.forEach(function (st) {
      if (isActive(st) && isBooked(d, s(st.student_id), id)) n++;
    });
    return n;
  }
  function workshopView(d, w) {
    var cap = parseInt(w.capacity, 10);
    var booked = bookedCount(d, w);
    return {
      id: s(w.workshop_id),
      cohort: s(w.cohort),
      day: s(w.day_number),
      name: s(w.workshop_name),
      date: s(w.date),
      time: s(w.start_time),
      location: s(w.location),
      notes: s(w.notes),
      capacity: isNaN(cap) ? null : cap,
      booked: booked,
      spotsLeft: isNaN(cap) ? null : Math.max(0, cap - booked),
      past: isPast(d, w)
    };
  }

  /* One entry per course day: done (attended), booked (upcoming booking) or open. */
  function dayStates(d, student) {
    var sid = s(student.student_id), states = {}, order = [];
    cohortWorkshops(d, student.cohort).forEach(function (w) {
      var day = s(w.day_number);
      if (!day) return;
      if (!(day in states)) { states[day] = 'open'; order.push(day); }
      var wid = s(w.workshop_id);
      if (attStatus(d, sid, wid) === 'present') states[day] = 'done';
      else if (states[day] !== 'done' && isBooked(d, sid, wid) && !isPast(d, w)) states[day] = 'booked';
    });
    return order.sort(byDay).map(function (day) { return { day: day, state: states[day] }; });
  }

  function studentHome(db, studentId) {
    var d = load(db);
    var st = d.studentById[studentId];
    if (!st || !isActive(st)) fail('Your access is no longer active. Ask your facilitator.');
    return {
      role: 'student',
      course: db.courseName(),
      today: d.today,
      student: { id: studentId, first_name: s(st.first_name), last_name: s(st.last_name), cohort: s(st.cohort) },
      days: dayStates(d, st),
      unavailable: dayStates(d, st).filter(function (x) {
        return x.state === 'open' && naOpen(d, studentId, x.day);
      }).map(function (x) {
        var r = naOpen(d, studentId, x.day);
        return { day: x.day, note: s(r.note), sent_at: s(r.sent_at) };
      }),
      workshops: cohortWorkshops(d, st.cohort).map(function (w) {
        var v = workshopView(d, w);
        v.myBooking = isBooked(d, studentId, v.id);
        v.myAttendance = attStatus(d, studentId, v.id);
        return v;
      })
    };
  }

  function book(db, studentId, workshopId) {
    var d = load(db);
    var st = d.studentById[studentId];
    var w = d.workshopById[s(workshopId)];
    if (!st || !isActive(st)) fail('Your access is no longer active. Ask your facilitator.');
    if (!w || !sameCohort(w.cohort, st.cohort)) fail('That workshop is not part of your course.');
    if (!w.date) fail('That workshop does not have a date yet.');
    if (isPast(d, w)) fail('That workshop has already run.');
    var wid = s(w.workshop_id), day = s(w.day_number);
    if (isBooked(d, studentId, wid)) fail('You are already booked on this workshop.');
    cohortWorkshops(d, st.cohort).forEach(function (other) {
      if (s(other.day_number) !== day) return;
      var oid = s(other.workshop_id);
      if (attStatus(d, studentId, oid) === 'present') fail('You have already completed Day ' + day + '.');
      if (oid !== wid && isBooked(d, studentId, oid) && !isPast(d, other)) {
        fail('You already have a booking for Day ' + day + '. Cancel it first to switch dates.');
      }
    });
    var v = workshopView(d, w);
    if (v.spotsLeft !== null && v.spotsLeft <= 0) fail('That workshop is full.');
    var existing = d.booking[studentId + '|' + wid];
    if (existing) {
      db.update('Bookings', existing, { status: 'confirmed', booked_at: db.now() });
    } else {
      db.append('Bookings', {
        booking_id: db.newId('B'), student_id: studentId, workshop_id: wid,
        booked_at: db.now(), status: 'confirmed'
      });
    }
    var na = naOpen(d, studentId, day);
    if (na) db.update('Unavailable', na, { status: 'booked' });
    return studentHome(db, studentId);
  }

  /* Student tells the facilitator they cannot make any of the dates for a day. */
  function sendUnavailable(db, studentId, day, note) {
    var d = load(db);
    var st = d.studentById[studentId];
    if (!st || !isActive(st)) fail('Your access is no longer active. Ask your facilitator.');
    day = s(day);
    var entry = dayStates(d, st).filter(function (x) { return x.day === day; })[0];
    if (!entry) fail('That day is not part of your course.');
    if (entry.state === 'done') fail('You have already completed Day ' + day + '.');
    if (entry.state === 'booked') fail('You are booked for Day ' + day + '. Cancel that booking first.');
    note = s(note).slice(0, 300);
    var existing = d.na[studentId + '|' + day];
    if (existing) {
      db.update('Unavailable', existing, { status: 'open', note: note, sent_at: db.now() });
    } else {
      db.append('Unavailable', {
        unavailable_id: db.newId('U'), student_id: studentId, cohort: s(st.cohort), day_number: day,
        note: note, sent_at: db.now(), status: 'open'
      });
    }
    return studentHome(db, studentId);
  }

  function withdrawUnavailable(db, studentId, day) {
    var d = load(db);
    var na = naOpen(d, studentId, s(day));
    if (na) db.update('Unavailable', na, { status: 'withdrawn' });
    return studentHome(db, studentId);
  }

  function cancel(db, studentId, workshopId) {
    var d = load(db);
    var w = d.workshopById[s(workshopId)];
    if (!w || !isBooked(d, studentId, s(w.workshop_id))) fail('You do not have a booking on that workshop.');
    if (isPast(d, w)) fail('That workshop has already run.');
    db.update('Bookings', d.booking[studentId + '|' + s(w.workshop_id)], { status: 'cancelled', booked_at: db.now() });
    return studentHome(db, studentId);
  }

  function facHome(db) {
    var d = load(db);
    var cohorts = {};
    d.workshops.forEach(function (w) { if (s(w.cohort)) cohorts[s(w.cohort)] = 1; });
    d.students.forEach(function (st) { if (s(st.cohort)) cohorts[s(st.cohort)] = 1; });
    return {
      role: 'facilitator',
      course: db.courseName(),
      today: d.today,
      cohorts: Object.keys(cohorts).sort(),
      workshops: d.workshops.map(function (w) {
        var v = workshopView(d, w), present = 0, marked = 0;
        d.students.forEach(function (st) {
          var a = attStatus(d, s(st.student_id), v.id);
          if (a) marked++;
          if (a === 'present') present++;
        });
        v.present = present;
        v.marked = marked;
        return v;
      }),
      students: d.students.filter(isActive).map(function (st) {
        return {
          id: s(st.student_id),
          name: (s(st.first_name) + ' ' + s(st.last_name)).trim(),
          cohort: s(st.cohort),
          days: dayStates(d, st)
        };
      }).sort(function (a, b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; }),
      unavailable: facUnavailable(d)
    };
  }

  /* Open can't-make-it notes for days the student has not completed, by day then name. */
  function facUnavailable(d) {
    var out = [];
    d.students.filter(isActive).forEach(function (st) {
      var sid = s(st.student_id);
      dayStates(d, st).forEach(function (x) {
        var r = x.state === 'open' && naOpen(d, sid, x.day);
        if (!r) return;
        out.push({
          student_id: sid,
          name: (s(st.first_name) + ' ' + s(st.last_name)).trim(),
          cohort: s(st.cohort),
          day: x.day,
          day_name: dayName(d, st.cohort, x.day),
          note: s(r.note),
          sent_at: s(r.sent_at)
        });
      });
    });
    return out.sort(function (a, b) {
      return byDay(a.day, b.day) || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    });
  }

  function facClearUnavailable(db, studentId, day) {
    var d = load(db);
    var na = naOpen(d, s(studentId), s(day));
    if (na) db.update('Unavailable', na, { status: 'cleared' });
    return facHome(db);
  }

  function facWorkshop(db, workshopId) {
    var d = load(db);
    var w = d.workshopById[s(workshopId)];
    if (!w) fail('That workshop was not found. It may have been removed from the sheet.');
    var v = workshopView(d, w);
    var roster = d.students.filter(function (st) {
      return isActive(st) && sameCohort(st.cohort, w.cohort);
    }).map(function (st) {
      var sid = s(st.student_id);
      return {
        student_id: sid,
        name: (s(st.first_name) + ' ' + s(st.last_name)).trim(),
        booked: isBooked(d, sid, v.id),
        unavailable: !!naOpen(d, sid, v.day),
        status: attStatus(d, sid, v.id)
      };
    }).sort(function (a, b) {
      if (a.booked !== b.booked) return a.booked ? -1 : 1;
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
    return { workshop: v, roster: roster };
  }

  function facSave(db, workshopId, marks) {
    var d = load(db);
    var w = d.workshopById[s(workshopId)];
    if (!w) fail('That workshop was not found. It may have been removed from the sheet.');
    var wid = s(w.workshop_id);
    (marks || []).forEach(function (m) {
      var sid = s(m.student_id);
      var status = s(m.status).toLowerCase();
      var st = d.studentById[sid];
      if (!st || !sameCohort(st.cohort, w.cohort)) fail('One of those students is not in this cohort.');
      if (status !== '' && status !== 'present' && status !== 'absent') fail('Attendance must be present or absent.');
      var existing = d.att[sid + '|' + wid];
      if (existing) {
        if (s(existing.status).toLowerCase() !== status) {
          db.update('Attendance', existing, { status: status, marked_at: db.now() });
        }
      } else if (status) {
        db.append('Attendance', {
          attendance_id: db.newId('A'), student_id: sid, workshop_id: wid,
          status: status, marked_at: db.now(), notes: ''
        });
      }
    });
    return facWorkshop(db, wid);
  }

  var STUDENT = { home: 1, book: 1, cancel: 1, sendNa: 1, withdrawNa: 1 };
  var FACILITATOR = { facHome: 1, facWorkshop: 1, facSave: 1, facClearNa: 1 };

  function handle(action, p, ctx, db) {
    p = p || {};
    if (STUDENT[action] && ctx.role === 'student') {
      if (action === 'home') return studentHome(db, ctx.studentId);
      if (action === 'book') return book(db, ctx.studentId, p.workshop_id);
      if (action === 'sendNa') return sendUnavailable(db, ctx.studentId, p.day, p.note);
      if (action === 'withdrawNa') return withdrawUnavailable(db, ctx.studentId, p.day);
      return cancel(db, ctx.studentId, p.workshop_id);
    }
    if (FACILITATOR[action] && ctx.role === 'facilitator') {
      if (action === 'facHome') return facHome(db);
      if (action === 'facWorkshop') return facWorkshop(db, p.workshop_id);
      if (action === 'facClearNa') return facClearUnavailable(db, p.student_id, p.day);
      return facSave(db, p.workshop_id, p.marks);
    }
    fail('You are not signed in for that.');
  }

  return { handle: handle, isActive: isActive, WRITES: { book: 1, cancel: 1, facSave: 1, sendNa: 1, withdrawNa: 1, facClearNa: 1 } };
})();

/* ---------------------------------------------------------------------------
 * Google Sheet side: menu, sign-in, and reading/writing the tabs.
 * ------------------------------------------------------------------------- */

var TABS = {
  Settings: ['setting', 'value'],
  Students: ['student_id', 'cohort', 'first_name', 'last_name', 'email', 'access_code', 'status'],
  Workshops: ['workshop_id', 'cohort', 'day_number', 'workshop_name', 'date', 'start_time', 'location', 'capacity', 'notes'],
  Bookings: ['booking_id', 'student_id', 'workshop_id', 'booked_at', 'status'],
  Attendance: ['attendance_id', 'student_id', 'workshop_id', 'status', 'marked_at', 'notes'],
  Unavailable: ['unavailable_id', 'student_id', 'cohort', 'day_number', 'note', 'sent_at', 'status']
};
var DEFAULT_COURSE_NAME = 'Ambulance Responder Course';
var STUDENT_SESSION_DAYS = 90;
var FACILITATOR_SESSION_HOURS = 12;
var MAX_FAILED_SIGNINS = 10;       // across everyone, per 10 minutes
var MIN_PASSCODE_LENGTH = 8;

/* ------------------------------- Menu ---------------------------------- */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Course App')
    .addItem('1. Set up sheet', 'setupSheet')
    .addItem('2. Set facilitator passcode', 'setFacilitatorPasscode')
    .addSeparator()
    .addItem('Fill in IDs and access codes for new rows', 'prepareNewRows')
    .addToUi();
}

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  Object.keys(TABS).forEach(function (name) {
    var sh = ss.getSheetByName(name) || ss.insertSheet(name);
    var wanted = TABS[name];
    if (sh.getLastRow() === 0) {
      sh.getRange(1, 1, 1, wanted.length).setValues([wanted]);
    } else {
      var have = headerRow_(sh);
      wanted.forEach(function (h) {
        if (have.indexOf(h) === -1) {
          sh.getRange(1, sh.getLastColumn() + 1).setValue(h);
          have.push(h);
        }
      });
    }
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, sh.getLastColumn()).setFontWeight('bold');
  });

  // Keep IDs as text, and dates and times in one predictable format.
  ['Students', 'Workshops', 'Bookings', 'Attendance', 'Unavailable'].forEach(function (name) {
    var sh = ss.getSheetByName(name);
    ['student_id', 'workshop_id', 'booking_id', 'attendance_id', 'unavailable_id', 'access_code', 'cohort', 'day_number'].forEach(function (h) {
      setColumnFormat_(sh, h, '@');
    });
  });
  setColumnFormat_(ss.getSheetByName('Workshops'), 'date', 'yyyy-mm-dd');
  setColumnFormat_(ss.getSheetByName('Workshops'), 'start_time', 'hh:mm');
  setColumnFormat_(ss.getSheetByName('Bookings'), 'booked_at', 'yyyy-mm-dd hh:mm');
  setColumnFormat_(ss.getSheetByName('Attendance'), 'marked_at', 'yyyy-mm-dd hh:mm');
  setColumnFormat_(ss.getSheetByName('Unavailable'), 'sent_at', 'yyyy-mm-dd hh:mm');

  var settings = ss.getSheetByName('Settings');
  if (settings.getLastRow() < 2) settings.appendRow(['course_name', DEFAULT_COURSE_NAME]);

  var students = ss.getSheetByName('Students');
  var workshops = ss.getSheetByName('Workshops');
  if (students.getLastRow() < 2 && workshops.getLastRow() < 2) {
    var answer = ui.alert('Add example rows?',
      'This adds two example students and three example workshops so you can try the app straight away. Delete them when you add your real ones.',
      ui.ButtonSet.YES_NO);
    if (answer === ui.Button.YES) addExampleRows_(ss);
  }
  secret_();
  prepareNewRows();
  ui.alert('Sheet is ready', 'Next: Course App > Set facilitator passcode, then deploy the web app (see the README).', ui.ButtonSet.OK);
}

function addExampleRows_(ss) {
  var tz = ss.getSpreadsheetTimeZone();
  var cohort = Utilities.formatDate(new Date(), tz, 'yyyy');
  function inDays(n) {
    return Utilities.formatDate(new Date(Date.now() + n * 86400000), tz, 'yyyy-MM-dd');
  }
  var students = ss.getSheetByName('Students');
  appendByHeader_(students, { cohort: cohort, first_name: 'Example', last_name: 'Student One', email: 'one@example.com', status: 'active' });
  appendByHeader_(students, { cohort: cohort, first_name: 'Example', last_name: 'Student Two', email: 'two@example.com', status: 'active' });
  var workshops = ss.getSheetByName('Workshops');
  appendByHeader_(workshops, { cohort: cohort, day_number: 1, workshop_name: 'Scene safety and primary survey', date: inDays(7), start_time: '09:00', location: 'Training Room 1', capacity: 12 });
  appendByHeader_(workshops, { cohort: cohort, day_number: 2, workshop_name: 'CPR and defibrillation', date: inDays(14), start_time: '09:00', location: 'Training Room 1', capacity: 12 });
  appendByHeader_(workshops, { cohort: cohort, day_number: 2, workshop_name: 'CPR and defibrillation', date: inDays(16), start_time: '13:00', location: 'Training Room 1', capacity: 12 });
}

/* Gives every new student an ID and access code, and every new workshop an ID. */
function prepareNewRows() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var done = 0;
  done += fillIds_(ss.getSheetByName('Students'), 'student_id', 'S', 'first_name', function (sh, row, headers) {
    var codeCol = headers.indexOf('access_code') + 1;
    var statusCol = headers.indexOf('status') + 1;
    var changed = 0;
    if (codeCol && !String(sh.getRange(row, codeCol).getDisplayValue()).trim()) {
      sh.getRange(row, codeCol).setValue(newAccessCode_());
      changed++;
    }
    if (statusCol && !String(sh.getRange(row, statusCol).getDisplayValue()).trim()) {
      sh.getRange(row, statusCol).setValue('active');
    }
    return changed;
  });
  done += fillIds_(ss.getSheetByName('Workshops'), 'workshop_id', 'W', 'workshop_name', null);
  ss.toast(done ? done + ' ID(s) or access code(s) filled in.' : 'Nothing to fill in. Every row already has its ID and code.', 'Course App');
}

function fillIds_(sh, idHeader, prefix, requiredHeader, extra) {
  if (!sh) throw new Error('Run Course App > Set up sheet first.');
  var headers = headerRow_(sh);
  var idCol = headers.indexOf(idHeader) + 1;
  var reqCol = headers.indexOf(requiredHeader) + 1;
  if (!idCol || !reqCol || sh.getLastRow() < 2) return 0;
  var values = sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getDisplayValues();
  var max = 0;
  values.forEach(function (r) {
    var m = String(r[idCol - 1]).trim().match(new RegExp('^' + prefix + '(\\d+)$'));
    if (m) max = Math.max(max, parseInt(m[1], 10));
  });
  var changed = 0;
  values.forEach(function (r, i) {
    if (!String(r[reqCol - 1]).trim()) return;
    var row = i + 2;
    if (!String(r[idCol - 1]).trim()) {
      max++;
      sh.getRange(row, idCol).setValue(prefix + ('00' + max).slice(-3));
      changed++;
    }
    if (extra) changed += extra(sh, row, headers);
  });
  return changed;
}

function setFacilitatorPasscode() {
  var ui = SpreadsheetApp.getUi();
  var res = ui.prompt('Facilitator passcode',
    'Choose a passcode of at least ' + MIN_PASSCODE_LENGTH + ' characters. You type this into the app to open the facilitator screens. Setting a new one signs out any facilitator who is signed in.',
    ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() !== ui.Button.OK) return;
  var passcode = String(res.getResponseText()).trim();
  if (passcode.length < MIN_PASSCODE_LENGTH) {
    ui.alert('Passcode not changed', 'It needs at least ' + MIN_PASSCODE_LENGTH + ' characters.', ui.ButtonSet.OK);
    return;
  }
  var salt = Utilities.getUuid();
  PropertiesService.getScriptProperties().setProperties({ FAC_SALT: salt, FAC_HASH: hashPasscode_(salt, passcode) });
  ui.alert('Passcode saved', 'It is stored scrambled, so it cannot be read back from here. If you forget it, set a new one.', ui.ButtonSet.OK);
}

/* ----------------------------- Web app --------------------------------- */

function doGet() {
  return ContentService.createTextOutput('Course app backend is running.');
}

function doPost(e) {
  var out;
  try {
    out = { ok: true, data: route_(JSON.parse(e.postData.contents)) };
  } catch (err) {
    if (!err.userFacing) console.error(err && err.stack ? err.stack : err);
    out = {
      ok: false,
      code: err.code || '',
      error: err.userFacing ? err.message : 'The sheet could not complete that. Try again in a moment.'
    };
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

function route_(req) {
  var action = String(req.action || '');
  var db = sheetDb_();

  if (action === 'login') return studentLogin_(req, db);
  if (action === 'facLogin') return facilitatorLogin_(req, db);

  var ctx = authenticate_(req.token, db);
  if (!Core.WRITES[action]) return Core.handle(action, req, ctx, db);

  // One write at a time, so two people saving together cannot clash.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (busy) {
    throw userError_('The sheet is busy. Try again in a few seconds.');
  }
  try {
    return Core.handle(action, req, ctx, sheetDb_());
  } finally {
    SpreadsheetApp.flush();
    lock.releaseLock();
  }
}

function studentLogin_(req, db) {
  checkNotLockedOut_();
  var code = normaliseCode_(req.code);
  var match = null;
  if (code) {
    db.rows('Students').forEach(function (st) {
      if (!match && st.student_id && Core.isActive(st) && normaliseCode_(st.access_code) === code) match = st;
    });
  }
  if (!match) {
    noteFailedSignin_();
    throw userError_('That access code was not recognised. Check it with your facilitator.');
  }
  var payload = { r: 's', id: match.student_id, exp: Date.now() + STUDENT_SESSION_DAYS * 86400000 };
  var ctx = { role: 'student', studentId: match.student_id };
  return { token: makeToken_(payload, code), home: Core.handle('home', {}, ctx, db) };
}

function facilitatorLogin_(req, db) {
  checkNotLockedOut_();
  var props = PropertiesService.getScriptProperties();
  var salt = props.getProperty('FAC_SALT');
  var hash = props.getProperty('FAC_HASH');
  if (!salt || !hash) throw userError_('No facilitator passcode has been set yet. In the sheet, use Course App > Set facilitator passcode.');
  if (hashPasscode_(salt, String(req.passcode || '').trim()) !== hash) {
    noteFailedSignin_();
    throw userError_('That passcode is not right.');
  }
  var payload = { r: 'f', exp: Date.now() + FACILITATOR_SESSION_HOURS * 3600000 };
  return { token: makeToken_(payload, hash), home: Core.handle('facHome', {}, { role: 'facilitator' }, db) };
}

function authenticate_(token, db) {
  var parts = String(token || '').split('.');
  var payload = null;
  try {
    payload = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(parts[0])).getDataAsString());
  } catch (bad) { payload = null; }
  if (payload && parts.length === 2 && payload.exp > Date.now()) {
    if (payload.r === 'f') {
      var hash = PropertiesService.getScriptProperties().getProperty('FAC_HASH');
      if (hash && sign_(parts[0], hash) === parts[1]) return { role: 'facilitator' };
    }
    if (payload.r === 's') {
      var student = null;
      db.rows('Students').forEach(function (st) {
        if (st.student_id === String(payload.id)) student = st;
      });
      // Signed with the student's access code, so changing the code in the sheet signs them out.
      if (student && Core.isActive(student) && sign_(parts[0], normaliseCode_(student.access_code)) === parts[1]) {
        return { role: 'student', studentId: student.student_id };
      }
    }
  }
  var e = userError_('Please sign in again.');
  e.code = 'auth';
  throw e;
}

/* --------------------------- Sign-in helpers --------------------------- */

function userError_(message) {
  var e = new Error(message);
  e.userFacing = true;
  return e;
}
function secret_() {
  var props = PropertiesService.getScriptProperties();
  var v = props.getProperty('TOKEN_SECRET');
  if (!v) {
    v = Utilities.getUuid() + Utilities.getUuid();
    props.setProperty('TOKEN_SECRET', v);
  }
  return v;
}
function sign_(body, extra) {
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(body, secret_() + '|' + extra));
}
function makeToken_(payload, extra) {
  var body = Utilities.base64EncodeWebSafe(JSON.stringify(payload));
  return body + '.' + sign_(body, extra);
}
function hashPasscode_(salt, passcode) {
  return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + '|' + passcode));
}
function normaliseCode_(v) {
  return String(v == null ? '' : v).toUpperCase().replace(/[^A-Z0-9]/g, '');
}
function newAccessCode_() {
  var alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O or 1/I/L
  var hex = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
  var code = '';
  for (var i = 0; code.length < 6; i += 3) {
    code += alphabet.charAt(parseInt(hex.substr(i, 3), 16) % alphabet.length);
  }
  return code;
}
function checkNotLockedOut_() {
  if (Number(CacheService.getScriptCache().get('failed_signins') || 0) >= MAX_FAILED_SIGNINS) {
    throw userError_('Too many wrong sign-in attempts. Wait 10 minutes and try again.');
  }
}
function noteFailedSignin_() {
  var cache = CacheService.getScriptCache();
  cache.put('failed_signins', String(Number(cache.get('failed_signins') || 0) + 1), 600);
}

/* ---------------------------- Sheet storage ---------------------------- */

function headerRow_(sh) {
  if (sh.getLastColumn() === 0) return [];
  return sh.getRange(1, 1, 1, sh.getLastColumn()).getDisplayValues()[0].map(function (h) {
    return String(h).trim().toLowerCase();
  });
}
function setColumnFormat_(sh, header, format) {
  var col = headerRow_(sh).indexOf(header) + 1;
  if (col && sh.getMaxRows() > 1) sh.getRange(2, col, sh.getMaxRows() - 1, 1).setNumberFormat(format);
}
function appendByHeader_(sh, obj) {
  sh.appendRow(headerRow_(sh).map(function (h) { return obj[h] == null ? '' : obj[h]; }));
}
function normaliseDate_(v) {
  v = String(v || '').trim();
  var m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return m[1] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[3]).slice(-2);
  m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/); // day/month/year
  if (m) return m[3] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2);
  return '';
}
function normaliseTime_(v) {
  var m = String(v || '').trim().match(/^(\d{1,2})[:.](\d{2})(?::\d{2})?\s*(am|pm)?/i);
  if (!m) return String(v || '').trim();
  var h = parseInt(m[1], 10);
  if (m[3]) {
    var pm = m[3].toLowerCase() === 'pm';
    if (pm && h < 12) h += 12;
    if (!pm && h === 12) h = 0;
  }
  return ('0' + h).slice(-2) + ':' + m[2];
}

function sheetDb_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tz = ss.getSpreadsheetTimeZone();
  var tables = {};

  function table(tab) {
    if (tables[tab]) return tables[tab];
    var sh = ss.getSheetByName(tab);
    // Sheets set up before the Unavailable tab existed get it on the first write.
    if (!sh && tab === 'Unavailable') return (tables[tab] = { sheet: null, headers: TABS[tab].slice(), rows: [] });
    if (!sh) throw userError_('The sheet is missing its ' + tab + ' tab. Run Course App > Set up sheet.');
    var values = sh.getDataRange().getDisplayValues();
    var headers = (values[0] || []).map(function (h) { return String(h).trim().toLowerCase(); });
    var rows = [];
    for (var i = 1; i < values.length; i++) {
      var obj = { _row: i + 1 };
      for (var c = 0; c < headers.length; c++) {
        if (headers[c]) obj[headers[c]] = String(values[i][c]).trim();
      }
      if (tab === 'Workshops') {
        obj.date = normaliseDate_(obj.date);
        obj.start_time = normaliseTime_(obj.start_time);
      }
      rows.push(obj);
    }
    tables[tab] = { sheet: sh, headers: headers, rows: rows };
    return tables[tab];
  }

  return {
    rows: function (tab) { return table(tab).rows; },
    append: function (tab, obj) {
      var t = table(tab);
      if (!t.sheet) {
        t.sheet = ss.insertSheet(tab);
        t.sheet.appendRow(t.headers);
        t.sheet.setFrozenRows(1);
        t.sheet.getRange(1, 1, 1, t.headers.length).setFontWeight('bold');
        t.sheet.getRange(2, 1, t.sheet.getMaxRows() - 1, t.headers.length).setNumberFormat('@');
      }
      t.sheet.appendRow(t.headers.map(function (h) { return obj[h] == null ? '' : obj[h]; }));
      var row = { _row: t.sheet.getLastRow() };
      Object.keys(obj).forEach(function (k) { row[k] = String(obj[k]); });
      t.rows.push(row);
    },
    update: function (tab, row, changes) {
      var t = table(tab);
      Object.keys(changes).forEach(function (k) {
        var col = t.headers.indexOf(k) + 1;
        if (col) t.sheet.getRange(row._row, col).setValue(changes[k]);
        row[k] = String(changes[k]);
      });
    },
    today: function () { return Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd'); },
    now: function () { return Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm'); },
    newId: function (prefix) { return prefix + Utilities.getUuid().replace(/-/g, '').slice(0, 10).toUpperCase(); },
    courseName: function () {
      var name = '';
      table('Settings').rows.forEach(function (r) {
        if (String(r.setting).toLowerCase() === 'course_name' && r.value) name = r.value;
      });
      return name || DEFAULT_COURSE_NAME;
    }
  };
}
