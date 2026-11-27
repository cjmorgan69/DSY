/* The modules on the microlearning landing pages, by audience, in display order. Each name is a folder under
   /microlearning/ with a content.js. Add a name here when you create a module.
   ao: /microlearning/ao/   paramedic: /microlearning/paramedic/   rn: /microlearning/rn/ (navy theme)   leaders: /microlearning/leaders/ (Team Leaders, leader sign-in) */
window.MODULE_LISTS = {
  ao: ["stroke", "envenomation", "hypoglycaemia", "chest-pain", "anaphylaxis", "asthma", "sepsis", "falls", "pain", "acpo", "headache", "nausea", "burns", "mva-baseline", "spinal", "dementia", "refusal", "bushfire"],
  paramedic: ["tbi", "crush", "faint-or-fit", "asthma-copd"],
  rn: ["sepsis-nursing", "asthma-copd-ed"],
  leaders: ["leaders-dashboard", "leaders-people", "leaders-gaps", "leaders-training-nights", "leaders-relief", "leaders-team-page"]
};
window.MODULE_LIST = window.MODULE_LISTS.ao;
