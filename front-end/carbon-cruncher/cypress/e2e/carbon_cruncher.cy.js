describe("Carbon Cruncher app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000")
  })

  it("front page can be opened", function () {
    cy.contains("Carbon Cruncher")
    cy.contains("Climate Data Visualizations")
  })

  it("user cannot login with non existing credentials", function () {
    cy.get("#loginUsername").type("testiukko")
    cy.get("#loginPassword").type("Testi123!")
    cy.get("#submitLogin").click()
    cy.on("window:alert", (t) => {
      expect(t).to.contains("Invalid credentials")
    })
  })

  it("user cannot be registered with two different passwords", function () {
    cy.contains("Don't have an account yet?")
    cy.get("#registerUser").click()
    cy.contains("Username and password info")
    cy.get("#registerUserName").type("testiukko")
    cy.get("#registerPassword").type("Testi123!")
    cy.get("#registerConfirmPassword").type("Tesi123!")
    cy.get("#submitRegistration").click()
    cy.on("window:alert", (t) => {
      expect(t).to.contains("Password and password confirmation did not match")
    })
  })

  it("user can be registered with register form", function () {
    cy.contains("Don't have an account yet?")
    cy.get("#registerUser").click()
    cy.contains("Username and password info")
    cy.get("#registerUserName").type("testiukko")
    cy.get("#registerPassword").type("Testi123!")
    cy.get("#registerConfirmPassword").type("Testi123!")
    cy.get("#submitRegistration").click()
    cy.on("window:alert", (t) => {
      expect(t).to.contains("User testiukko was created succesfully")
    })
  })

  it("user can login", function () {
    cy.get("#loginUsername").type("testiukko")
    cy.get("#loginPassword").type("Testi123!")
    cy.get("#submitLogin").click()
    cy.contains("testiukko")
  })

  it("user can be removed", function () {
    cy.get("#loginUsername").type("testiukko")
    cy.get("#loginPassword").type("Testi123!")
    cy.get("#submitLogin").click()
    cy.contains("testiukko")
    cy.get("#deleteUser").click()
    cy.contains("Carbon Cruncher")
    cy.contains("Climate Data Visualizations")
  })

  it("user cannot login with deleted credentials", function () {
    cy.get("#loginUsername").type("testiukko")
    cy.get("#loginPassword").type("Testi123!")
    cy.get("#submitLogin").click()
    cy.on("window:alert", (t) => {
      expect(t).to.contains("Invalid credentials")
    })
    cy.contains("Carbon Cruncher")
    cy.contains("Climate Data Visualizations")
  })
})
