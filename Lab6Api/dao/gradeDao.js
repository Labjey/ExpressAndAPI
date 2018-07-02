var Grade = require('../model/grade');
class GradeDao{
    static addGrade(grade){
        return new Promise((resolve, reject)=>{
            if(grade.name===undefined || grade.course===undefined|| grade.grade===undefined){
                reject('Invalid format, please use this format to add grade information:\n'+
                JSON.stringify(GradeDao.grades[0], null, '\t'));
            }
            else{
                GradeDao.grades.push(new Grade(grade.name, grade.course, grade.grade));
                resolve('Provided grade information added successfully')
            }
        });
    }

    static getGrade(id){
        return new Promise((resolve, reject)=>{
            for(let idx in GradeDao.grades){
                if(id==GradeDao.grades[idx].id){
                    resolve(GradeDao.grades[idx]);
                }
            }
            reject(`Grade information with ${id} is not found in the database`);
        }) 
    }

    static getGrades(){
        return GradeDao.grades;
    }
}
GradeDao.grades=[new Grade('Temesgen', 'MWA', 'A'),
            new Grade('Habte', 'Algorithm', 'A') ];

module.exports=GradeDao;