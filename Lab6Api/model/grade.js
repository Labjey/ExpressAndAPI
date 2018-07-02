class Grade{
    constructor(name, course, grade){
        this.name=name;
        this.course=course;
        this.grade=grade;
        this.id=++Grade.instanceCount;
    }
}
Grade.instanceCount=0;
module.exports=Grade;