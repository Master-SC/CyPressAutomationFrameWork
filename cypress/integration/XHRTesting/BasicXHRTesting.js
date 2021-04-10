describe("Example of XHR Testing using CyPress",function(){
    it("Validation of GET Request",function(){
        cy.visit('https://example.cypress.io/commands/network-requests')
        cy.intercept('GET',"**comments/*").as("getComment")
        cy.contains("Get Comment").click()
        cy.wait('@getComment').its('response.statusCode').should('eq',200)
        cy.get('@getComment').should(({response})=>{
            expect(response.body).to.have.property('postId')
            expect(response && response.body).to.have.property('body', 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium')
        })
    })

    it("Validation of POST Request",function(){
        cy.visit('https://example.cypress.io/commands/network-requests')
        cy.intercept('POST',"**/comments").as('postComment')

        cy.contains('Post Comment').click()
        cy.wait('@postComment').its('response.statusCode').should('eq',201)
        cy.get('@postComment').should(({request,response})=>{
            expect(response.body).to.have.property('id')
            expect(request && request.headers).to.have.property('content-type','application/x-www-form-urlencoded; charset=UTF-8')
            expect(request.headers).to.have.property('origin')
            expect(response && response.body).to.have.property('email','hello@cypress.io')
            expect(response && response.body).to.have.property('name','Using POST in cy.intercept()')
        })
    })

    it('Mock a response using PUT Request',function(){
        let msg = 'Error in Update comment !!'
        cy.visit('https://example.cypress.io/commands/network-requests')
        cy.intercept({
            method:'PUT',
            url:'**/comments/*'
        },
        {
            statusCode:404,
            body:{error:msg},
            header:{'access-control-allow-origin':'*'},
            delayMs:1000
        }).as('putComment')

        cy.contains('Update Comment').click()

        cy.wait('@putComment')
        cy.get('div.network-put-comment').should('contain',msg)
    })
})