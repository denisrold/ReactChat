import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <h5 className="text-center">CHAT</h5>
            {/*NickName*/}
            <form>
              <div className="d-flex mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nickname..."
                  id="nickname"
                />
                <button
                  className="btn btn-success mx-3"
                  type="submit"
                  id="btn-nickname"
                >
                  Save
                </button>
              </div>
            </form>

            {/*CHAT Form*/}
            <form>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Message..."
                  id="message"
                />
                <button
                  className="btn btn-success mx-3"
                  type="submit"
                  id="btn-message"
                >
                  Send
                </button>
              </div>
            </form>

            {/*Chat Message*/}
            <div className="card mt-3 mb-3" id="content-chat">
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
