function Home() {
  return (
    <>
      <div className="container">
        <header className="containerPaddingTop">
          <div className="container px-4 px-lg-5 h-100">
            <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-8 align-self-end">
                <img id="imgHome" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Avatar_The_Last_Airbender_logo.svg/2560px-Avatar_The_Last_Airbender_logo.svg.png" alt="" />
                <h1 className="font-weight-bold">Avatar Card Game!</h1>
                <hr className="divider" />
              </div>
              <div className="col-lg-8 align-self-baseline">
                <p className="text-white-75 mb-5">Mini game for play!</p>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
export default Home;
