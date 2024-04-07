const fs = require('fs').promises;
const { json } = require('express');

const CampusUnitEnum = { 
    university:0,
    faculty:1,
    vocationalSchool:2,//Meslek Yüksekokulu
    college:3, //Yüksekokul
    institute:4,
    department:5,
    majorBranch:6, //Ana Bilim Dalı
    //program:7 
}
exports.CampusUnitEnum = CampusUnitEnum;

class CampusUnit{
    constructor(id,type,parentId,name,url)
        {this.id = id; this.type = type; this.parentId = parentId; this.name = name; this.url = url; }

        static getCampusUnitType(type){
                console.log(`type is: ${type} ----`);

            if(type == undefined){
                //console.log(`subMenuTitle is undefined : ${type} ----`);
                return -1;
            }
            let result = -1;
            
            if(type.includes("üniversite")) result= CampusUnitEnum.university;
            if(type.includes("fakülte")) result= CampusUnitEnum.faculty;           
            if(type.includes("yüksekokul")) result= CampusUnitEnum.college;
            if(type.includes("meslek yüksekokul")) result= CampusUnitEnum.vocationalSchool;
            if(type.includes("enstitü")) result= CampusUnitEnum.institute;
            if(type.includes("bölüm")) result= CampusUnitEnum.department;
            if(type.includes("anabilim")) result= CampusUnitEnum.majorBranch;
            //if(type.includes("program")) result= CampusUnitEnum.program;

            console.log(`result is: ${result} ----`);
            return result;
        }


        static async writeCampusUnitToFile(campusUnit) {
            await this.writeToFileAsDartObject(campusUnit);

            //     let text = (campusUnit == null) ? "" : JSON.stringify(campusUnit)+",";
            // await fs.appendFile('./db.json',`${text}\n`, function (err) {
            //   if (err) throw err;
            // });
        }

        static async writeToFileAsDartObject(campusUnit){
            let campusUnitType =(campusUnit == undefined)? "" :CampusUnit.getUnitEnumName(campusUnit.type);
            let text = (campusUnit == null) ? "" : `CampusUnit(${campusUnit.id},CampusUnitEnum.${campusUnitType},${campusUnit.parentId},"${campusUnit.name}","${campusUnit.url}"),`;
            await fs.appendFile('./db.json',`${text}\n`, function (err) {
              if (err) throw err;
            });
        }

        static getUnitEnumName(value) {
            for (let key in CampusUnitEnum) {
              if (CampusUnitEnum[key] === value) {
                return key;
              }
            }
            return null;
        }

}
exports.default = CampusUnit;