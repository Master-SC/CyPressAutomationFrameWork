class checkoutPage{
    getCheckoutButton(){
        return cy.get("button.btn.btn-success")
    }

    getProductTotalPrice(){
        return cy.get("tr td:nth-child(4) strong")
    }

    getTotalOrderPrice(){
        return cy.get("td h3 strong")
    }

    getItemQty(){
        return cy.get("input#exampleInputEmail1")
    }

    getItemUnitCost(){
        return cy.get("tr td:nth-child(3) strong")
    }

    getItems(){
        return cy.get("div.media-body")
    }

    getItemTableRow(){
        return cy.get("table.table.table-hover tbody tr")
    }

}

export default checkoutPage