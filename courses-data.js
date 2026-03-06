"use strict";

// ===================== بيانات المساقات =====================

const courses = Object.freeze({

biology:{
title:"الأحياء",
code:"BIOL 101",
icon:"fa-dna",
semester:1,

books:[
{
name:"كتاب الأحياء - د. أيمن أبو مصطفى 2024",
link:"https://www.mediafire.com/file/8oddlw5fw751nd2/Biology+Dr.+Ayman+Abu+Mustafa+2024.pdf/file",
year:"2024"
}
],

lectures:[
{name:"محاضرة 1 - الجزء الأول",link:"https://www.youtube.com/watch?v=8COAdAXo6mo",type:"youtube"},
{name:"محاضرة 1 - الجزء الثاني",link:"https://www.youtube.com/watch?v=-EcD5MBMoiM",type:"youtube"},
{name:"محاضرة 2 - الجزء الأول",link:"https://www.youtube.com/watch?v=gZG1I2mVBFI",type:"youtube"},
{name:"محاضرة 2 - الجزء الثاني",link:"https://www.youtube.com/watch?v=gZG1I2mVBFI",type:"youtube"}
]

},

chemistry:{
title:"الكيمياء",
code:"CHEM 101",
icon:"fa-flask",
semester:1,

books:[
{
name:"كتاب الكيمياء",
link:"https://drive.google.com/file/d/16NwS8HV1UizqrMnKnAAIOhth_6STxxff/view?usp=drivesdk",
year:"2024"
}
],

lectures:[
{name:"محاضرة 1",link:"https://www.youtube.com/watch?v=QEBq2ujVl9k",type:"youtube"},
{name:"محاضرة 2 - الجزء الأول",link:"https://drive.google.com/file/d/1mYbo3lYhfrgPPNBlbPWvGVKbNDS4DPNS/view",type:"drive"},
{name:"محاضرة 2 - الجزء الثاني",link:"https://drive.google.com/file/d/1xUd0aEy4mXPDkghZmZvjSW6wUCW-WFkv/view",type:"drive"}
]

},

physics:{
title:"مقدمة التمريض",
code:"PHYS 101",
icon:"fa-atom",
semester:1,

books:[
{
name:"كتاب مقدمة التمريض",
link:"https://drive.google.com/file/d/1MvpccHOlHV3XcPUrtB7uXDoKFdB5MlSr/view?usp=sharing",
year:"2024"
}
],

lectures:[
{name:"محاضرة 1",link:"https://www.youtube.com/watch?v=apf3Jagp1ak&list=PLftkcFPCNYd1Fvio2pIx20w8I-z4Lp0YF&index=10",type:"youtube"},
{name:"محاضرة 2",link:"https://www.youtube.com/watch?v=QnK68q-yeGQ&list=PLftkcFPCNYd1Fvio2pIx20w8I-z4Lp0YF&index=9",type:"youtube"}
]

},

anatomy:{
title:"القضية الفلسطينية",
code:"ANAT 101",
icon:"fa-brain",
semester:1,

books:[
{
name:"كتاب القضية الفلسطينية",
link:"https://drive.google.com/file/d/1HOyQGAJut0J7DGQTGTwoA_4l5qxRAshs/view?usp=drivesdk",
year:"2024"
}
],

lectures:[
{name:"محاضرة 1",link:"https://www.youtube.com/watch?v=2KXiwod-doc",type:"youtube"},
{name:"محاضرة 2",link:"https://drive.google.com/file/d/14W1ToppqX7YtAv4N2_USjBHGbphMsuY-/view",type:"drive"}
]

},

physiology:{
title:"العقيدة الإسلامية",
code:"PHYL 101",
icon:"fa-heartbeat",
semester:1,

books:[
{
name:"كتاب العقيدة الإسلامية",
link:"https://drive.google.com/file/d/1Dp31f1IO5W7-3n5_08OnUCY1CRJe8giz/view?usp=sharing",
year:"2024"
}
],

lectures:[
{name:"محاضرة 1",link:"https://drive.google.com/file/d/1-0LcO1NKGpS24Wsxh2HlOrbm2h8x0J9l/view",type:"drive"},
{name:"محاضرة 2",link:"https://drive.google.com/file/d/1TQwAck0RKeO7SVVf_gmCvpyAe8lamqBI/view",type:"drive"}
]

},

biochemistry:{
title:"اللغة العربية",
code:"BCHM 101",
icon:"fa-dna",
semester:1,

books:[
{
name:"كتاب اللغة العربية",
link:"https://drive.google.com/file/d/1rFw8PreTixsl7om5OYdSblZR9fSdznrU/view?usp=drive_link",
year:"2024"
}
],

lectures:[
{name:"محاضرة 1",link:"https://drive.google.com/file/d/1hTV61Wi_QhsgvNS4053kyuCQiIJ8mrWS/view",type:"drive"},
{name:"محاضرة 2",link:"https://drive.google.com/file/d/1svLca-O5m-Jp-Kvlf37kVsqfRcBRlBCS/view",type:"drive"}
]

},

med_terms:{
title:"مصطلحات طبية",
code:"MEDT 101",
icon:"fa-language",
semester:1,

books:[
{
name:"المصطلحات الطبية - د. أيمن أبو مصطفى 2024",
link:"https://www.mediafire.com/file/89jqd8vy6kx9t5r/Medical+Terminology+++2024+-+Dr.+Ayman+Abu+Mustafa+Students+lectures.pdf/file",
year:"2024"
}
],

lectures:[
{name:"محاضرة 1",link:"https://www.youtube.com/watch?v=5GJgok2w0jI",type:"youtube"},
{name:"محاضرة 2",link:"https://www.youtube.com/watch?v=R1477sBA7vw",type:"youtube"}
]

},

// ===================== الفصل الثاني =====================

nursing_practical:{
title:"تمريض عملي",
code:"NURS 102",
icon:"fa-hospital-user",
semester:2,
books:[{name:"دليل التمريض العملي",link:"#",year:"2024",coming:true}],
lectures:[]
},

nursing1:{
title:"أساسيات التمريض",
code:"NURS 101",
icon:"fa-stethoscope",
semester:2,
books:[{name:"كتاب أساسيات التمريض",link:"#",year:"2024",coming:true}],
lectures:[]
},

safety:{
title:"السلامة",
code:"SAFE 101",
icon:"fa-shield-halved",
semester:2,
books:[{name:"دليل السلامة المهنية",link:"#",year:"2024",coming:true}],
lectures:[]
},

microbio:{
title:"أحياء دقيقة",
code:"MICR 101",
icon:"fa-bacteria",
semester:2,
books:[{name:"كتاب الأحياء الدقيقة",link:"#",year:"2024",coming:true}],
lectures:[]
},

biochem2:{
title:"كيمياء حيوية طبية",
code:"BCHM 102",
icon:"fa-vial",
semester:2,
books:[{name:"كتاب الكيمياء الحيوية الطبية",link:"#",year:"2024",coming:true}],
lectures:[]
},

quran:{
title:"القران الكريم",
code:"QURN 101",
icon:"fa-book-quran",
semester:2,
books:[{name:"تفسير القرآن الكريم",link:"#",year:"2024",coming:true}],
lectures:[]
},

anatomy2:{
title:"التشريح 2",
code:"ANAT 102",
icon:"fa-bone",
semester:2,
books:[{name:"كتاب التشريح المتقدم",link:"#",year:"2024",coming:true}],
lectures:[]
}

});

// ===================== قوائم الفصول =====================

const semester1Courses = Object.freeze([
"biology",
"chemistry",
"physics",
"anatomy",
"physiology",
"biochemistry",
"med_terms"
]);

const semester2Courses = Object.freeze([
"nursing_practical",
"nursing1",
"safety",
"microbio",
"biochem2",
"quran",
"anatomy2"
]);
