/* Vehicle checklist data for /vehicle-check/.
   Source: SAAS FRM-384 Volunteer Vehicle Checklist - Mercedes VS 30, version 2.2 (30.10.2025).
   Items, descriptions and quantities are copied from the form. Obvious spelling slips are corrected
   (Advice, Manual, Glucagon, Burgundy, Paed, aide memoire). The form has no "areas": the six areas
   below are DSY's grouping of the form's sections, in the form's order, so several crew can each take
   one part of the vehicle. Change the grouping here if the lockers sit differently in your vehicle.
   Each item is [item, description, quantity]. Do not rename a section id: saved checks point at it. */
window.VEHICLE_CHECKLISTS = {
  vs30: {
    title: "Mercedes VS30",
    source: "FRM-384 Volunteer Vehicle Checklist - Mercedes VS 30, version 2.2, 30.10.2025; kits: FRM-397 Red Trauma Kit v4.1 (2025), FRM-365 Blue Airway Kit (Aug 2025)",
    areas: [
      { id: "cab", name: "Cab", hint: "Visors, doors, dash and consoles", sections: [
        { id: "sun-visor", name: "Sun visor", items: [
          ["Tabard/Vest", "", "1"], ["Infection Control Sticker", "", "1"], ["Tissue Box", "", "1"]] },
        { id: "document-holder", name: "Document holder", items: [
          ["Metro Street Directory", "", "1"], ["Country Street Directory", "", "1"], ["TNT Envelopes", "", "10"],
          ["Spare Case Cards", "", "10"], ["Clinical Notes Supplement", "Pad", "1"], ["Against Medical Advice", "Pad", "1"],
          ["Stryker Manual", "", "1"], ["Change over Checklist", "", "1"], ["VS 30 Checklist", "", "1"]] },
        { id: "centre-console", name: "Centre console", items: [
          ["MagLight Torches", "", "2"], ["Gloves - Boxes", "Small", "1"], ["Gloves - Boxes", "Medium", "1"],
          ["Gloves - Boxes", "Large", "1"], ["Gloves - Boxes", "X-Large", "1"],
          ["Rubbish Bin", "With Plastic Bag Bin Liners", "1"], ["Handheld Radios", "", "2"],
          ["Spare Radio Batteries", "In charging docks", "2"]] },
        { id: "centre-of-dash", name: "Centre of dash", items: [
          ["Stay at home Numbers", "", "10"], ["Out of Service Tags", "", "10"], ["Consumer Tags", "", "10"],
          ["MH Clients statement of Rights", "", "5"], ["Sunscreen", "", "1"], ["Insect Repellent", "", "1"],
          ["Ear plugs", "", "5"], ["Safety Glasses", "", "2"], ["Fuel Cards - On Front Console", "Region Specific", "2"]] },
        { id: "left-passenger-door", name: "Left passenger door", items: [
          ["Hand Towel", "", "1"], ["Aquium Hand Gel 375ml", "Bottle", "1"], ["Clinical Commander Pack", "", "1"],
          ["Commander/Clinician Velcro Panel", "In Clinical Commander Pack", "1x each"],
          ["Clinical Commander Pack", "Incident Commander Book", "1"], ["Clinical Commander Pack", "Action Card Book", "1"],
          ["Clinical Commander Pack", "Incident Management Guide", "1"]] },
        { id: "right-driver-door", name: "Right driver door", items: [
          ["Hand Towel", "", "1"], ["Aquium Hand Gel 375ml", "Bottle", "1"], ["Mercedes Vehicle Manual", "", "1"],
          ["Mercedes Phone Cable", "", "1"], ["Vehicle Defect Book", "", "1"]] },
        { id: "centre-console-rhs", name: "Centre console RHS", items: [
          ["Controlled Substance Register", "", "1"], ["Case Cards", "", "10"], ["Case Card Folder", "", "1"]] },
        { id: "drivers-visor", name: "Drivers visor", items: [
          ["Mass Casualty Incident Pack", "", "1"], ["Tissue Box", "", "1"], ["Vest/Tabard", "", "1"]] }
      ] },
      { id: "grab-go", name: "Grab & Go and Lockers 1 to 3", hint: "Grab & Go locker, footwell, Lockers 1, 2 and 3", sections: [
        { id: "grab-go-top", name: "Grab & Go locker top", items: [
          ["PPE", "N95 Masks - Small", "2"], ["PPE", "N95 Masks - Regular", "2"], ["PPE", "N95 Masks - Large", "2"],
          ["PPE", "Clinell Wipes", "1"], ["PPE", "ISO Wipes", "1"], ["PPE", "Surgical Masks", "1"], ["PPE", "Overspecs", "2"]] },
        { id: "grab-go-top-left", name: "Grab & Go locker top - left", items: [
          ["Oxygen Spares", "Adult Standard Face Mask", "2"], ["Oxygen Spares", "Adult Nebuliser", "2"],
          ["Oxygen Spares", "Adult Non-rebreather Mask", "2"], ["Oxygen Spares", "Paediatric Standard Face Mask", "2"],
          ["Oxygen Spares", "Paediatric Nebuliser", "2"], ["Oxygen Spares", "Paediatric Non-rebreather Mask", "2"],
          ["Oxygen Spares", "Nasal Cannula", "2"]] },
        { id: "grab-go-top-right", name: "Grab & Go locker top - right", items: [
          ["Blue Slide Sheet", "", "1"], ["Sally Tubes", "Small for Seat Transfer", "5"],
          ["Sally Tubes", "Large for Stretcher transfer", "6"]] },
        { id: "grab-go-top-bottom", name: "Grab & Go locker top & bottom", items: [
          ["Trauma Kit - Red", "", "1"], ["Airway Kit - Blue", "", "1"], ["Oxygen Sock", "", "1"],
          ["Electronic Suction and Charging cable", "", "1"]] },
        { id: "locker-1", name: "Locker 1", items: [["Oxygen Cylinders \"C\" Size", "", "2"]] },
        { id: "footwell", name: "Footwell", items: [["Fire Extinguisher", "", "1"]] },
        { id: "locker-2", name: "Locker 2", items: [
          ["Tissues", "Box - Holder Beneath Locker 2", "1"], ["Defib Pads", "Adult", "2 Pkt"], ["Defib Pads", "Child", "1 Pkt"],
          ["Paper Rolls 50mm", "", "2 rolls"], ["ECG Spare Dots", "", "2 Pkts"], ["P2 Masks", "Small", "2"],
          ["P2 Masks", "Regular", "2"], ["3M Masks", "Universal Size", "2"], ["MDI Spacer", "", "1"],
          ["Surgical Masks with ear Loop", "Universal Size", "2"], ["Tympanic Probe Covers", "", "1"]] },
        { id: "locker-3", name: "Locker 3", items: [
          ["Gloves Nitrile", "Small", "1"], ["Gloves Nitrile", "Medium", "1"], ["Gloves Nitrile", "Large", "1"],
          ["Gloves Nitrile", "X-Large", "1"]] }
      ] },
      { id: "kits", name: "Grab & Go kits", hint: "Red trauma kit, yellow drug kit, blue airway kit and oxygen sock", sections: [
        { id: "red-trauma-kit", name: "Red trauma kit", note: "From FRM-397 Red Trauma Kit - Volunteer, version 4.1 (2025). The yellow drug kit inside it is its own section.", items: [
          ["Universal Shears", "", "1"], ["Gloves", "Small", "1 pair"], ["Gloves", "Medium", "1 pair"], ["Gloves", "Large", "1 pair"],
          ["Gloves", "X-Large", "1 pair"], ["Tactical Tourniquets", "", "2"], ["Triangular Bandage", "", "1"], ["Eye Pads", "", "3"],
          ["Emergency Blankets", "", "2"], ["Band Aids", "", "1"], ["30ml Saline", "", "2"], ["Dymadon and Syringe", "Paracetamol suspension", "1"],
          ["Aquium Gel", "60ml", "1"], ["Glucometer Kit and Lancets", "", "1"], ["Tympanic Thermometer", "", "1"], ["Saline 500ml Bag", "", "1"],
          ["IV Giving Set", "", "1"], ["Defib Pads", "Child", "1"], ["Consult Pad", "", "1"], ["Spacer", "E Chamber", "1"], ["Embags", "", "3"],
          ["Combine Dressings", "10cm x 10cm", "3"], ["Combine Dressings", "20cm x 20cm", "2"], ["Combine Dressings", "20cm x 75cm", "1"],
          ["BP Cuff", "Side pocket", "1"], ["Stethoscope", "Side pocket", "1"], ["Penlight", "", "1"], ["Surgical Tape 25mm", "", "1"],
          ["Roller Bandages", "10cm x 1.6m", "1"], ["Roller Bandages", "15cm x 1.6m", "1"], ["ECG Electrodes", "Pack", "1"],
          ["Defib Pads", "Adult (spare)", "2"], ["Monitor Paper", "Spare", "1"], ["BP Cuff", "XL (Burgundy)", "1"],
          ["BP Cuff", "Upper Arm (Blue)", "1"], ["BP Cuff", "Child (Green)", "1"], ["Hyfin Chest Seal twin pack", "", "1"]] },
        { id: "yellow-drug-kit", name: "Yellow drug kit (in the trauma kit)", note: "From FRM-397 Red Trauma Kit - Volunteer, version 4.1 (2025), yellow drug kit contents list.", items: [
          ["Aspirin (Disprin)", "Tray", "1"], ["Paracetamol Tablets 500mg", "Tray of 10", "1"], ["Salbutamol nebules", "5mg/2.5ml, pack of 5", "1"],
          ["Ipratropium Bromide nebules", "Pack of 5", "1"], ["Ondansetron Wafers 4mg", "Tray of 10", "1"], ["Ventolin MDI", "Salbutamol", "1"],
          ["Midazolam", "", "2"], ["Glucagon", "", "1"], ["Benzylpenicillin 1.2g", "", "2"], ["Water for Injection", "", "2"],
          ["Methoxyflurane (Penthrox)", "", "1"], ["Naloxone", "400 microg/ml", "2"], ["Nitrostat", "300 microg tablets", "1"],
          ["Adrenaline", "1mg/1ml (1:1000)", "4"], ["Oral Glucose Gel", "15ml", "2"], ["Saline 10ml Ampoules", "", "4"],
          ["Tourniquets", "For IV access", "2"], ["Alcohol Swabs", "", "4"], ["Combi-Stoppers", "", "2"], ["Drawing Up Needles 18g", "", "4"],
          ["Giving Needles 23g", "", "4"], ["Tegaderm", "10cm x 12cm", "3"], ["Tegaderm", "7cm x 8.5cm", "3"], ["Surgical Tape 25mm", "", "1"],
          ["Razors", "Disposable", "1"], ["Syringe Luer-Lok", "1ml", "3"], ["Syringe Luer-Lok", "3ml", "2"], ["Syringe Luer-Lok", "5ml", "3"],
          ["Syringe Luer-Lok", "10ml", "2"], ["IV Bungs", "", "2"]] },
        { id: "blue-airway-kit", name: "Blue airway kit", note: "From FRM-365 Blue Airway Kit - Volunteer (August 2025) contents list.", items: [
          ["Cotton Ties", "Tie off tape (herringbone) 1m", "2"], ["Lubricant - KY Jelly", "", "4"],
          ["i-gel Supraglottic Airway", "Size 2", "1"], ["i-gel Supraglottic Airway", "Size 3", "1"], ["i-gel Supraglottic Airway", "Size 4", "1"],
          ["i-gel Supraglottic Airway", "Size 5", "1"], ["Resus Masks", "White - Neonatal", "1"], ["Resus Masks", "Pink - Infant", "1"],
          ["Resus Masks", "Yellow - Child", "1"], ["Resus Masks", "Green - Small Adult", "1"], ["Resus Masks", "Red - Adult", "1"],
          ["Resus Masks", "Blue - Large Adult", "1"], ["Co-Phenylcaine Forte", "Spray", "1"], ["Co-Phenylcaine Forte", "Nozzles, pack of 3", "1"],
          ["Nasopharyngeal Airways", "6mm", "1"], ["Nasopharyngeal Airways", "7mm", "1"], ["Nasopharyngeal Airways", "8mm", "1"],
          ["Y Suction Catheters", "6g", "1"], ["Y Suction Catheters", "10g", "1"], ["Y Suction Catheters", "16g", "1"],
          ["Oropharyngeal Airways", "Size 00 - Blue", "1"], ["Oropharyngeal Airways", "Size 1 - Brown", "1"], ["Oropharyngeal Airways", "Size 2 - Green", "1"],
          ["Oropharyngeal Airways", "Size 3 - Yellow", "1"], ["Oropharyngeal Airways", "Size 4 - Red", "1"], ["Bag Valve Mask Adult", "", "1"],
          ["Filter - HME", "Adult", "1"], ["Filter - HME", "Paediatric", "1"], ["Universal Shears", "", "1"], ["Syringe Luer Lock 50ml", "", "1"],
          ["N95/P2 Masks", "", "2"], ["3M Masks", "", "2"], ["Bio-Hazard bags", "", "1"], ["Surgical Masks", "Level 3", "2"],
          ["Oxygen Tubing", "For the BVM", "1"], ["Safety Glasses", "", "2"]] },
        { id: "oxygen-sock", name: "Oxygen sock", note: "Contents as set by the lead instructor (22 Nov 2026).", items: [
          ["Oxygen Cylinder \"C\" Size", "Halo", "1"], ["Nasal Cannula", "Adult (specs)", "1"], ["Standard Face Mask", "Adult - 8 L/min", "1"],
          ["Non-rebreather Mask", "Adult - 15 L/min", "1"], ["Nebuliser Mask", "Adult", "1"], ["Nasal Cannula", "Paediatric (specs)", "1"],
          ["Standard Face Mask", "Paediatric - 8 L/min", "1"], ["Non-rebreather Mask", "Paediatric - 15 L/min", "1"], ["Nebuliser Mask", "Paediatric", "1"]] }
      ] },
      { id: "workstation", name: "Locker 4 workstation and drug drawer", hint: "Top, middle and bottom drawers, drug drawer insert", sections: [
        { id: "locker-4-top", name: "Locker 4 workstation top drawer", items: [
          ["Corpuls Monitor (Facing Airways Seat)", "", "1"], ["Tourniquet", "", "1"], ["Razors", "", "1"],
          ["Alcohol Swabs", "", "5"], ["Penlight Torch", "", "1"], ["Surgical Tape 25mm", "", "2"], ["Eye Dressings", "", "3"],
          ["Tegaderm", "Small", "5"], ["Tegaderm", "Large", "5"],
          ["Protect IV Cannula", "14g", "3"], ["Protect IV Cannula", "16g", "3"], ["Protect IV Cannula", "18g", "3"],
          ["Protect IV Cannula", "20g", "3"], ["Protect IV Cannula", "22g", "3"], ["Protect IV Cannula", "24g", "3"],
          ["IV Bungs", "", "4"], ["Glucometer Workstation", "Glucometer", "1"],
          ["Glucometer Workstation", "Blood Glucose Test Strips", "Multiple"], ["Glucometer Workstation", "Control Solution", "1"],
          ["Glucometer Workstation", "FreeStyle Optium Neo H Glucose Test Strips", "Multiple"],
          ["Glucometer Workstation", "Control Solution Medisense Hi&Lo", "1"], ["Lancets", "", "10"],
          ["Universal Shears", "", "1"], ["Hyfin Chest Seal twin pack", "", "1"], ["Adhesive Band Aid Strips", "", "1"]] },
        { id: "locker-4-middle", name: "Locker 4 workstation middle drawer", items: [
          ["Drawing Up Needles 18g", "", "5"], ["Giving Needles 23g", "", "5"], ["Syringe Luer-Lok", "1ml", "4"],
          ["Syringe Luer-Lok", "3ml", "4"], ["Syringe Luer-Lok", "5ml", "4"], ["Syringe Luer-Lok", "10ml", "4"],
          ["Syringe Purple 10ml", "For Paracetamol Suspension", "2"], ["Saline 10ml Ampoules", "", "5"],
          ["Combi-Stoppers", "", "8"], ["MAD Nasal Intranasal Atomiser", "", "2"], ["Water for Injection", "", "4"]] },
        { id: "drug-drawer", name: "Drug drawer insert", items: [
          ["Nitrostat", "", "1"], ["Aspirin Packet", "", "1"], ["Water for Injection 10ml", "", "2"], ["Adrenaline", "", "4"],
          ["Methoxyflurane + Device", "", "2 - Check Region"], ["Naloxone", "", "2"], ["Glucagon", "", "1"],
          ["Paracetamol Tablet", "", "1 sheet"], ["Midazolam", "", "2"], ["Benzylpenicillin 1.2g", "", "2"],
          ["Salbutamol", "Kept in Foil - 3 month expiry post opening", "1 pkt"], ["Ipratropium", "", "2"],
          ["Ventolin MDI", "", "1"], ["Ipratropium MDI", "", "1"], ["Ondansetron", "Wafers", "1 sheet"],
          ["Oral Glucose", "Sachet", "3"], ["Liquid Paracetamol Suspension", "", "1"], ["Carbetocin", "", "1"],
          ["Ceftriaxone", "", "1"], ["Olanzapine", "", "1 Sheet"]] },
        { id: "locker-4-bottom", name: "Locker 4 workstation bottom drawer", items: [
          ["Burnaid Dressing", "Small", "1"], ["Burnaid Dressing", "Large", "1"], ["Infusion Sets", "", "2"],
          ["Saline 500ml Viaflex bag", "", "2"], ["IV Burette", "", "1"], ["Syringe Luer Lok 50ml", "", "1"],
          ["Glad Wrap", "", "1"]] }
      ] },
      { id: "lockers-5-12", name: "Lockers 5 to 12", hint: "Lockers 5, 6, 7, 8, 9, 10, 11 and 12", sections: [
        { id: "locker-5", name: "Locker 5", items: [
          ["Sharps Container", "Square", "1"], ["Rubbish Bin", "With Plastic Bag Liner", "1"], ["Bin Liners", "", "5"]] },
        { id: "below-locker-5", name: "Below Locker 5", items: [
          ["Sphygmomanometer", "Wall Mounted (where available)", "1"], ["Aquium Gel", "Bottle", "1"]] },
        { id: "locker-6", name: "Locker 6", items: [
          ["Stethoscope", "", "1"], ["Sphygmomanometer BP Cuff Set", "Adult", "1"], ["Sphygmomanometer BP Cuff Set", "Paed", "1"],
          ["Sharps Container", "Square", "1"], ["Sharps Container", "Small Push Top", "1"],
          ["Clinical Masks", "P2 Masks - Small", "2"], ["Clinical Masks", "P2 Masks - Regular", "2"],
          ["Clinical Masks", "N95 Masks", "2"], ["Emesis Bags", "", "4"], ["Blue Incontinence Sheets", "", "4"],
          ["Clinical Masks", "Standard Therapy Mask - Paed", "1"], ["Clinical Masks", "Nebuliser Mask - Paed", "1"],
          ["Clinical Masks", "Non-rebreather Mask - Paed", "1"], ["Clinical Masks", "Nasal Cannula", "3"],
          ["CorPuls BP Cuffs", "Prime Cuff (Blue)", "1"], ["CorPuls BP Cuffs", "XL (Burgundy)", "1"]] },
        { id: "locker-7", name: "Locker 7", items: [
          ["Roller Bandages", "10cm", "6"], ["Roller Bandages", "15cm", "6"], ["30ml Saline", "", "6"],
          ["Clinical Masks", "Standard Therapy Mask - Adult", "2"], ["Clinical Masks", "Nebuliser - Adult", "2"],
          ["Clinical Masks", "Non-rebreather Mask - Adult", "2"], ["Clinical Masks", "Nasal Cannulas", "2"]] },
        { id: "locker-8", name: "Locker 8", items: [
          ["Dressings", "Universal", "4"], ["Dressings", "10x10", "5"], ["Dressings", "10x20", "5"], ["Dressings", "20x20", "5"],
          ["Dressings", "Eye Pad", "5"], ["Dressings", "Band-Aids", "1 pkt"], ["Universal Shears", "", "1"],
          ["Rescue Blankets - Thermal", "Foil Type", "2"], ["Triangular Bandages", "", "2"], ["Elastoplast", "", "1"],
          ["Thermal Heat Hat", "", "2"]] },
        { id: "locker-9", name: "Locker 9", items: [
          ["Water", "Cups 390ml", "4"], ["Water", "Bottles 600ml", "2"], ["Pillowcases", "", "4"]] },
        { id: "locker-10", name: "Locker 10", items: [["Sheets", "", "8"], ["Chair Stretcher", "Below Locker 10", "1"]] },
        { id: "locker-11", name: "Locker 11", items: [
          ["Actichlor Plus", "", "1"], ["Cleaning Bucket", "", "1"], ["Cleaning Cloths", "", "1"],
          ["Bio-Hazard bags", "Yellow", "2"], ["Clinell Wipes", "", "1"], ["Iso Wipes", "", "1"],
          ["Patient Belonging Bags", "", "4"]] },
        { id: "locker-12", name: "Locker 12", items: [["Spinal Board Straps", "Set of 8", "1 set"], ["Lifting Straps", "", "4"]] }
      ] },
      { id: "lockers-13-17", name: "Lockers 13 to 17 and maternity kit", hint: "Lockers 13, 14, 15, 16, 17 and the maternity kit", sections: [
        { id: "locker-13", name: "Locker 13", items: [["Spinal Board", "", "1"]] },
        { id: "locker-14", name: "Locker 14", items: [
          ["PATSLIDE", "", "2"], ["Cargo Net", "", "1"], ["Sam Splints", "Small", "1"], ["Sam Splints", "Standard", "1"],
          ["Sam Splints", "Large", "1"], ["Plastic Sheets", "Large", "1"], ["CT-6 Splint/Slishman Traction Splint", "", "1"],
          ["Collar Bag", "Adult", "2"], ["Collar Bag", "Paediatric", "2"], ["Cardboard Splint", "Small", "2"],
          ["Cardboard Splint", "Large", "2"], ["Pedi Mate", "", "1"], ["Body Bag", "", "1"]] },
        { id: "locker-15", name: "Locker 15", items: [
          ["Blankets", "", "2"], ["Saline 500ml Viaflex Bag", "", "2"], ["Bath Towels", "", "2"], ["Face Towels", "", "2"]] },
        { id: "locker-16", name: "Locker 16", items: [["Safety Net", "", "1"], ["Snake Bite Kit", "", "1"], ["Safety Shields", "", "2"]] },
        { id: "locker-17", name: "Locker 17", items: [["Trauma Teddy", "", "1"], ["Maternity kit", "", "1"]] },
        { id: "maternity-kit", name: "Maternity kit", note: "The sterile maternity kit is pre-made and pre-checked.", items: [
          ["Resus Kit - Child", "", "1"],
          ["New Maternity Pack", "Mattress Gel Warming Neonate 10in x 16in", "1"], ["New Maternity Pack", "Masks - Neonate infant 50mm", "1"],
          ["New Maternity Pack", "Masks - Resus Neonatal 42mm", "1"], ["New Maternity Pack", "Neo-Help Medium", "1"],
          ["New Maternity Pack", "Thermometer Digital", "1"], ["New Maternity Pack", "Obstetric aide memoire", "1"],
          ["Sterile Maternity Kit", "13cm Blunt Scissors", "1"], ["Sterile Maternity Kit", "Cord Clamps", "6"],
          ["Sterile Maternity Kit", "Blue incontinence Pads", "2"], ["Sterile Maternity Kit", "Flannelette Blanket", "1"],
          ["Sterile Maternity Kit", "Gown - Yellow for Mother", "1"], ["Sterile Maternity Kit", "Gloves Nitrile Large Pair", "1"],
          ["Sterile Maternity Kit", "Dressing 9x10", "2"], ["Sterile Maternity Kit", "Dressing 20x20", "2"],
          ["Sterile Maternity Kit", "Nappy Disposable", "1"], ["Sterile Maternity Kit", "Towel", "1"]] }
      ] },
      { id: "lockers-18-24", name: "Lockers 18 to 24", hint: "Airway lockers 18 to 20, Lockers 21 to 24 and miscellaneous", sections: [
        { id: "locker-18", name: "Locker 18", items: [
          ["Oropharyngeal Airways", "Size 00 - 50mm Blue", "1"], ["Oropharyngeal Airways", "Size 1 - 70mm White", "1"],
          ["Oropharyngeal Airways", "Size 2 - 80mm Green", "1"], ["Oropharyngeal Airways", "Size 3 - 90mm Yellow", "1"],
          ["Oropharyngeal Airways", "Size 4 - 100mm Red", "1"], ["Cotton Ties", "1 Metre length", "2"], ["Bite Block", "", "1"],
          ["Lubricant - Water based Gel", "Sachet", "2"], ["Filter - Hydrophobic Viral HME - Adult", "", "1"],
          ["Filter Bacterial Viral HME - Paed", "", "1"], ["Syringe Luer Lock 50ml", "", "1"],
          ["Co-Phenylcaine Forte", "Bottle 50ml", "1"], ["Co-Phenylcaine Forte", "Spray Nozzle", "2"]] },
        { id: "locker-19", name: "Locker 19", items: [
          ["Bag Valve Mask Adult", "With Extension Trunk and Valve", "1"], ["Adult Mask", "Size 3 - Green", "1"],
          ["Adult Mask", "Size 4 - Red", "1"], ["Adult Mask", "Size 5 - Blue", "1"],
          ["Bag Valve Mask Paediatric", "With Extension Trunk and Valve", "1"], ["Paediatric Mask", "Size 0 - White", "1"],
          ["Paediatric Mask", "Size 1 - Pink", "1"], ["Paediatric Mask", "Size 2 - Yellow", "1"]] },
        { id: "locker-20", name: "Locker 20", items: [
          ["Y Suction Catheters", "6g", "1"], ["Y Suction Catheters", "10g", "1"], ["Y Suction Catheters", "16g", "1"],
          ["i-gel Supraglottic Airway", "Size 1", "1"], ["i-gel Supraglottic Airway", "Size 2", "1"],
          ["i-gel Supraglottic Airway", "Size 3", "1"], ["i-gel Supraglottic Airway", "Size 4", "1"],
          ["i-gel Supraglottic Airway", "Size 5", "1"], ["Nasopharyngeal Airways", "6mm", "1"],
          ["Nasopharyngeal Airways", "7mm", "1"], ["Nasopharyngeal Airways", "8mm", "1"], ["Large Bore Suction", "", "2"]] },
        { id: "locker-21", name: "Locker 21", items: [["Crew Bags - Top", "", "2"], ["Helmets", "", "2"], ["Jumper Leads", "", "1"]] },
        { id: "locker-22", name: "Locker 22", items: [["S8 Drugs", "S8 Medications", "1"]] },
        { id: "locker-23", name: "Locker 23", items: [
          ["Bedpan", "", "1"], ["Urinal", "", "1"], ["Suction tubes", "", "2"], ["Suction Bags", "Medivac Liners", "2"],
          ["Toilet Paper", "", "1"], ["Suction Cannister", "", "2"]] },
        { id: "locker-24", name: "Locker 24", items: [
          ["Oxygen Cylinders \"D\" Size", "", "2"], ["Fire Extinguisher", "", "1"],
          ["Light Rescue/Access Pack", "Tool Bag - Green", "1"], ["Light Rescue/Access Pack", "Hatchet", "1"],
          ["Light Rescue/Access Pack", "Pliers", "1"], ["Light Rescue/Access Pack", "Saw - General Purpose", "1"],
          ["Light Rescue/Access Pack", "Wrecking Bar", "1"], ["Light Rescue/Access Pack", "Heavy Duty \"Riggers\" Gloves", "2 pairs"],
          ["Spare Stryker Battery and Charger", "", "1"], ["Dog Harness", "", "1"]] },
        { id: "miscellaneous", name: "Miscellaneous", items: [
          ["Local Maps", "Stored Where Appropriate", ""], ["Access Remotes", "Kept as per Local Agreement", ""]] }
      ] }
    ]
  }
};
