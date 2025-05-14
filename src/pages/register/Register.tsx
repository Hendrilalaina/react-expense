const Register = () => {
  return <div className="d-flex justify-content-center align-items-center login-background">
    <div className="container col-md-4 col-sm-12">
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" name="name" id="name" className="form-control" placeholder="Enter your name" />
          <div className="text-danger fst-italic">Name is required!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="text" name="email" id="email" className="form-control" placeholder="Enter your email" />
          <div className="text-danger fst-italic">Email is required!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" name="password" id="password" className="form-control" placeholder="Enter your password" />
          <div className="text-danger fst-italic">Password is required!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="retypePassword" className="form-label">
            Confirm password
          </label>
          <input type="password" name="retypePassword" id="retypePassword" className="form-control" placeholder="Confirm your password" />
          <div className="text-danger fst-italic">Password did not match!</div>
        </div>
        <button type="submit" className="btn btn-sm btn-outline-light btn-primary">Register</button>
      </form>
    </div>
  </div>
}

export default Register;