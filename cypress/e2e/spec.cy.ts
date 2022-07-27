describe('My First Test', () => {
  it('should go to register form', () => {
    cy.visit('https://sistema-empleos.vercel.app/');

    cy.contains('Crear una cuenta').click({force: true});
  })
  it("incorrect email and accept politics",()=>{
    cy.visit('https://sistema-empleos.vercel.app/auth/register')

    cy.get("[name='email']").type('myemail@domain')
    cy.get("[name='password']").type('1234')

    cy.get("[type='submit']").click()
  })
  it("correct email and select two rols",()=>{
    cy.visit('https://sistema-empleos.vercel.app/auth/register')
    
    cy.get("[name='email']").type('myemail@domain.com',{delay:100})
    cy.get("[name='password']").type('1234')
    cy.get('form').find('[name="rol[0]"]').check({force: true})
    cy.get('form').find('[name="rol[1]"]').check({force: true})

    cy.get("[type='submit']").click()
  })

})