import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    password2: "",
    accept: false,
    message: "",

    errors: {
      firstname: false,
      lastname: false,
      username: false,
      email: false,
      password: false,
      password2: false,
      accept: false,
    }
  }

  messages = {
    firstname_incorrect: 'To pole nie może być puste',
    lastname_incorrect: 'To pole nie może być puste',
    username_incorrect: 'Nazwa musi być dłuższa niż 5 znaków i nie może zawierać spacji',
    email_incorrect: 'Niepoprawna forma e-mail',
    password_incorrect: 'Hasło musi mieć minimum 8 znaków',
    password2_incorrect: 'Hasła nie są jednakowe!',
    accept_incorrect: 'Wymagane jest potwierdzenie zgody'
  }

  handleChange = (e) => {

    const name = e.target.name;
    const type = e.target.type;

    if (type === "text" || type === "password" || type === "email") {
      const value = e.target.value;

      this.setState({
        [name]: value

      })
    } else if (type === "checkbox") {
      const checked = e.target.checked;

      this.setState({
        [name]: checked
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const validation = this.formValidation();
    // console.log(validation);

    if (validation.correct) {

      this.setState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        password2: "",
        accept: false,
        message: "Formularz został wysłany",

        errors: {
          firstname: false,
          lastname: false,
          username: false,
          email: false,
          password: false,
          password2: false,
          accept: false,
        }
      })
    } else {
      this.setState({

        errors: {
          firstname: !validation.firstname,
          lastname: !validation.lastname,
          username: !validation.username,
          email: !validation.email,
          password: !validation.password,
          password2: !validation.password2,
          accept: !validation.accept,
        }
      })
    }
  }

  formValidation = () => {
    // true - ok
    // false - źle
    let firstname = false;
    let lastname = false;
    let username = false;
    let email = false;
    let password = false;
    let password2 = false;
    let accept = false;
    let correct = false;

    // indexOf === -1 tzn że nie ma spacji
    if (this.state.firstname.length !== 0) {
      firstname = true;
    }
    if (this.state.lastname.length !== 0) {
      lastname = true;
    }
    if (this.state.username.length > 5 && this.state.username.indexOf(' ') === -1) {
      username = true;
    }
    if (this.state.email.indexOf('@') !== -1 && this.state.email.indexOf('.') !== -1) {
      email = true;
    }
    if (this.state.password.length >= 8) {
      password = true;
    }
    if (this.state.password2 === this.state.password) {
      password2 = true;
    }
    if (this.state.accept) {
      accept = true;
    }
    if (username && email && password && accept) {
      correct = true;
    }
    return ({
      correct,
      firstname,
      lastname,
      username,
      password,
      password2,
      email,
      accept
    })
  }

  componentDidUpdate() {
    if (this.state.message !== '') {
      setTimeout(() => this.setState({
        message: ''
      }), 3000)
    }
  }

  render() {
    return (
      <>
        <div className="form">
          <div className="header">
            Formularz rejestracji
          </div>
          <form onSubmit={this.handleSubmit} noValidate>

            <label htmlFor="firstname">Imię:
            <input type="text" id="firstname" name="firstname" value={this.state.firstname} onChange={this.handleChange} />
              {this.state.errors.firstname && <span>{this.messages.firstname_incorrect}</span>}
            </label>

            <label htmlFor="lastname">Nazwisko:
            <input type="text" id="lastname" name="lastname" value={this.state.lastname} onChange={this.handleChange} />
              {this.state.errors.lastname && <span>{this.messages.lastname_incorrect}</span>}
            </label>

            <label htmlFor="email">E-mail:
            <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
              {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}
            </label>

            <label htmlFor="user">Login:
            <input type="text" id="user" name="username" value={this.state.username} onChange={this.handleChange} />
              {this.state.errors.username && <span>{this.messages.username_incorrect}</span>}
            </label>

            <label htmlFor="password">Hasło:
            <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
              {this.state.errors.password && <span>{this.messages.password_incorrect}</span>}
            </label>

            <label htmlFor="password2">Powtórz hasło:
            <input type="password" id="password2" name="password2" value={this.state.password2} onChange={this.handleChange} />
              {this.state.errors.password2 && <span>{this.messages.password2_incorrect}</span>}
            </label>

            <label htmlFor="accept">
              <input type="checkbox" id="accept" name="accept" checked={this.state.accept} onChange={this.handleChange} /> Wyrażam zgodę na przetrwarzanie danych
            </label>
            {this.state.errors.accept && <span>{this.messages.accept_incorrect}</span>}
            <button>Zarejestruj się</button>

          </form>
        </div >
        {this.state.message && <h3>{this.state.message}</h3>}

      </>
    );
  }
}


export default App;
