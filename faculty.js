const { JSDOM } = require('jsdom');
const {fetchAndParseHtml} = require('./fetch_page_content');
const {fetchDepartments} = require('./department');
const { default: CampusUnit } = require('./campus_unit');

async function  fetchFaculties() {
    const html =await fetchAndParseHtml();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    let idStartIndex=1;

    var campusUnits= [];
    var links = document.querySelectorAll(".subMenu ul")

    console.log(`Fac, Inst, MYO, YO count: ${links.length} \n`);


    for(let i=0;i <links.length;i++){
      //console.log(`i: ${links[i].previousElementSibling?.innerHTML} \n`);

      let unitType = links[i].previousElementSibling?.innerHTML;
      let campusUnitType = CampusUnit.getCampusUnitType(unitType?.toLowerCase());

      if(campusUnitType == -1){
        console.log(`campusUnitType is -1: ${unitType}`);
        continue;
      }
      let subLinks = links[i].querySelectorAll("li");
      for(let j=0;j<subLinks.length;j++){
        let link = subLinks[j].querySelector("a")?.attributes["href"].value;
        let name = subLinks[j].querySelector("a")?.text.trim();
        let campusUnit=new CampusUnit(idStartIndex,campusUnitType,0,name,link);
        await CampusUnit.writeCampusUnitToFile(campusUnit);
        campusUnits.push(campusUnit);

        idStartIndex+=1;
      }
        
    }

    let i =0;
    while (i < campusUnits.length) {
      await CampusUnit.writeCampusUnitToFile();//empty line
      let campusUnit = campusUnits[i];
     
      let departments = await fetchDepartments(campusUnit.url,campusUnit.name,campusUnit.id,campusUnits.length+1);
      campusUnits.push(...departments);
      i++;
      idStartIndex += departments.length;
      
    }

  }

  module.exports = {fetchFaculties};