const userData = {
    signupData:{ 
        successfullUser:{
            name:'john doe',
            email:'doe@mail.com',
            password:'doe@123',
        },
        badInputUser:{
            name:'o====p',
            email:'doe@mail.com',
            password:'doe@123',
        },
        badEmailUser:{
            name:'john doe',
            email:'doe@mailcom',
            password:'doe@123',
        },
        noNameUser:{
            name:'',
            email:'doe@mail.com',
            password:'doe@123',
        }
    },
    signinData: [],
}

export default userData;
