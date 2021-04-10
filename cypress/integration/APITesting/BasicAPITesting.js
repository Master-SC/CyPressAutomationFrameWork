describe("This is For Basic API testing using Cypress",function(){


    it("Add Book Libery API",function(){
        cy.request("POST","https://rahulshettyacademy.com/Library/Addbook.php",{
 
            "name":"Learn Appium Automation with Java",
            "isbn":"zzxsfdfdfdfdfbcq",
            "aisle":"20454784548656181",
            "author":"John foe"
            }
            ).then(function(response){
                expect(response.status).to.eq(200)
               // expect(response && response.body).to.have.property("Msg","successfully added")
            })
    })
})