import "./NavigationBar.scss"

const NavigationBar = () => {
  return (
    <nav className="navbar">
        <div className="navbar__logo-container">
            <p className="navbar__logo">logo placeholder</p>
        </div>
        <ul className="navbar__menu">
            <li classname="navbar__item">Log in</li>
            <li classname="navbar__item">Sign up</li>
        </ul>
        </nav>
  )
}

export default NavigationBar