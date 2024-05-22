import {Sequelize , DataTypes} from "sequelize"
export const sequelize = new Sequelize(
    "mysql://uzzhtofadjxckqfw:0sGONMv0PoO11vSurG3g@bivrb26myhzaqb01vpvl-mysql.services.clever-cloud.com:3306/bivrb26myhzaqb01vpvl"
);
sequelize.authenticate()
.then(()=>{
    console.log("Database Connected Successfully");
})
.catch((err)=>console.log(err))