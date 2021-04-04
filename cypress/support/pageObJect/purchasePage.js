class purchasePage{
    getDeliveryLocation(){
        return cy.get("input#country")
    }

    getTnCcheckBox(){
        return cy.get("div input[type=checkbox]")
    }

    getPurchaseButton(){
        return cy.get("input[value=Purchase]")
    }

    getSuggestionLocation(){
        return cy.get("div.suggestions ul li a")
    }
    getAlertPopUP(){
        return cy.get("div.alert.alert-success.alert-dismissible")
    }
    getSucessMsg(){
        return cy.get("div.alert.alert-success.alert-dismissible strong")
    }
    getMsgCloseLink(){
        return cy.get("div a.close")
    }


}
export default purchasePage