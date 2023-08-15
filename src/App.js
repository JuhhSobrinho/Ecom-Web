import logo from './logo.svg';
import './App.css';
import SplashScreen from './splash';

function App() {
  return (
    <div className="App">
      <SplashScreen />

      <div className='main'>
        <header className="App-header">

          <section className='header'>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className='titulo'>ecom</h1>
          </section>
          

        </header>


        <section className='app-login'>

          <section className='login'>
            <h1>login</h1>

            <div className='cadastro'>
              <span>Seu apelido: </span>
            </div>

          </section>
          

        </section>

      </div>
    </div>
  );
}

export default App;
