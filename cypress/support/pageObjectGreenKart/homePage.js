class homePage{
    getGreenKartText(){
       return cy.get("div.brand.greenLogo")
    }

    getProductSearchBox(){
        return cy.get("input.search-keyword")
    }

    getSearchedProduct(){
        return cy.get("div.product:visible")
    }

    getProductName(){
        return cy.get("h4.product-name")
    }

    getProductPrice(){
        return cy.get("p.product-price")
    }

    getTotalNumberOfItem(){
        return cy.get("div.cart-info table tbody tr:nth-child(1) td:nth-child(3) strong")
    }

    getTotalBasketPrice(){
        return cy.get("div.cart-info table tbody tr:nth-child(2) td:nth-child(3) strong")
    }

    getItemIncrementButton(){
        return cy.get("a.increment")
    }
    getItemQty(){
        return cy.get("input.quantity")
    }
    getAddToCart(){
        return cy.contains("ADD TO CART")
    }

    


}
export default homePage