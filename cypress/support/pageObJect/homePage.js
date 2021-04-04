class homePage{

    getName(){
        return cy.get("div.form-group input[name=name]")
    }

    getGender(){
        return cy.get("select")
    }

    getTwoWayDatabinding(){
        return cy.get("div.container h4 input")
    }

    getEntrepreneurOption(){
        return cy.get("input[value=option3]")
    }

    getShopLink(){
        return cy.get("ul.navbar-nav li:nth-child(2) a")
    }

}

export default homePage