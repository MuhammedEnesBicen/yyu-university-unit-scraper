const { JSDOM } = require('jsdom');
const {fetchAndParseHtml} = require('./fetch_page_content');
const { default: CampusUnit } = require('./campus_unit');

const BaseUrl = 'https://www.yyu.edu.tr/';
async function fetchDepartments(url,parentUnitName,parentUnitId,DepartmentIdStartIndex=0){
  //  url = BaseUrl+"Birimler/"+url;
  //  console.log("Department Url: "+url+"\n");

    let html;
    try{
      html = await fetchAndParseHtml(url);
    }
    catch (e){
      console.log(`while fetching this url: ${url} this error: ${e} happened`);
      return [];
    }
    
    const dom = new JSDOM(html);
    const document = dom.window.document;

    var departments= [];


var parentUl = document.querySelector(".subBirimMenu > ul");
let title = parentUl?.previousElementSibling.firstElementChild.innerHTML;

if(title == undefined || title == null){
  console.log(`hata verilen yer: element: ${parentUl.innerHTML} url: ${url} parentUnitName: ${parentUnitName} parentUnitId: ${parentUnitId}`);
  return [];
}

let campusUnitType = CampusUnit.getCampusUnitType(title?.toLowerCase());
if(campusUnitType == -1) {
  console.log("deparment skipped : title: "+title+ " parentUnitName: "+parentUnitName);
  return [];
}

var elements = parentUl.querySelectorAll("li > a");
    for(let i=0;i <elements.length;i++){

      if(elements[i].attributes["href"].value == "#"){
        console.log(parentUnitId,elements[i].text +" linki # olduğu için pas geçildi.");
        decreaseIndex-=1;
        continue;
      }

      let departmentLink = elements[i].attributes["href"].value;
      let departmentName = elements[i].text.trim();
      
      let department=new CampusUnit(i+DepartmentIdStartIndex,campusUnitType,parentUnitId,departmentName,departmentLink);
      await CampusUnit.writeCampusUnitToFile(department);
      departments.push(department);
    }



return departments;
  }

  module.exports = {fetchDepartments};


