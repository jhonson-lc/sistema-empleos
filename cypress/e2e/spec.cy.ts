describe("Pruebas Unitarias", () => {
  it("Ir a la página de registrar", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Crear una cuenta").click({ force: true });
  });

  describe("Pruebas de registro", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/auth/register");
    })

    it("Email incorrecto en register y campos vacíos", () => {
      cy.get("[name='email']").type("myemail@domain");
      cy.get("[type='submit']").click();

      cy.contains("Correo electrónico inválido");
      cy.contains("Este campo es requerido");
    });
    it("No selecciona roles", () => {
      cy.get("[name='email']").type("myemail@domain.com");
      cy.get("[name='password']").type("1234");
      cy.get('[name="poli"]').check({ force: true });
      cy.get("[type='submit']").click();

      cy.contains("Debe seleccionar al menos un rol");
    });

    it("Selecciona los dos roles", () => {
      cy.get("[name='email']").type("myemail@domain.com");
      cy.get("[name='password']").type("1234");
      cy.get("form").find('[name="rol[0]"]').check({ force: true });
      cy.get("form").find('[name="rol[1]"]').check({ force: true });
      cy.get("form").find('[name="poli"]').check({ force: true });
      cy.get("[type='submit']").click();

      cy.contains("Debe seleccionar solo un rol");
    });

    it("Registro correcto", () => {
      cy.get("[name='email']").type("myemail@test.com");
      cy.get("[name='password']").type("1234");
      cy.get("form").find('[name="rol[0]"]').check({ force: true });
      cy.get("form").find('[name="poli"]').check({ force: true });
      cy.get("[type='submit']").click();

      cy.get('[data-test-id="login-form-test"]').contains("Iniciar Sesión");
    });
  });

  describe("Pruebas de Login", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/auth/login");
    });

    it("Email incorrecto en iniciar sesión y campos vacíos", () => {
      cy.get("[name='email']").type("myemail@domain");
      cy.get("[type='submit']").click();

      cy.contains("Correo electrónico inválido");
      cy.contains("Este campo es requerido");
    });

    it("Credenciales incorrectas", () => {
      cy.get("[name='email']").type("myemail@domain.com");
      cy.get("[name='password']").type("12345");
      cy.get("[type='submit']").click();

      cy.contains("Usuario o contraseña incorrectos");
    });

    it("Iniciar sesión por primera vez", () => {
      cy.get("[name='email']").type("myemail@test.com");
      cy.get("[name='password']").type("1234");
      cy.get("[type='submit']").click();

      cy.contains("Crear Perfil");
    });
  });

  describe("Pruebas de Perfil", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/auth/login");
      
      cy.get("[name='email']").type("myemail@test.com");
      cy.get("[name='password']").type("1234");
      cy.get("[type='submit']").click();

    });
    
    it("Campos requeridos en el formulario de crear perfil del cliente", () => {
      cy.get("[type='submit']").click();

      cy.contains("Este campo es requerido");
    });

    it("Registro exitoso de formulario de crear perfil del cliente", () => {
      cy.get("[name='firstName']").type("Alex");
      cy.get("[name='lastName']").type("Solis");
      cy.get("[placeholder='Selecciona una fecha']").type("11/08/1999");
      cy.get("[name='phone']").type("123456789");
      cy.get("[type='submit']").click();
      
      cy.contains("Página principal");
    });
    it.only("Buscar por profesión y ciudad fallida",()=>{
      cy.intercept('GET', '/api/getEmployeers').as(
        'getEmployeers'
      )
      cy.wait('@getEmployeers')
      cy.get("[placeholder='Profesión']").type("Programador");
      cy.get("[placeholder='Ciudad']").type("Quito");

      cy.get('table tr').should('have.length', 0)
    })
    it("Buscar por profesión",()=>{
      cy.intercept('GET', '/api/getEmployeers').as(
        'getEmployeers'
      )
      cy.wait('@getEmployeers')
      cy.get("[placeholder='Profesión']").type("Programador");

      cy.contains("Programador");
    })
    it("Buscar por ciudad",()=>{
      cy.intercept('GET', '/api/getEmployeers').as(
        'getEmployeers'
      )
      cy.wait('@getEmployeers')
      cy.get("[placeholder='Ciudad']").type("Quito");

      cy.contains("Quito");
    })
    it.only("Buscar por profesión y ciudad",()=>{
      cy.intercept('GET', '/api/getEmployeers').as(
        'getEmployeers'
      )
      cy.wait('@getEmployeers')
      cy.get("[placeholder='Profesión']").type("Programador");
      cy.get("[placeholder='Ciudad']").type("Ambato");

      cy.contains("Programador");
      cy.contains("Ambato");
    })
  });
});
