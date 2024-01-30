import s from "./Foter.module.css"

export function Footer() {
  return (
    <>
      <footer className={s.footer}>
        <div className="container footer-all">
          <div className="footer-contacts">
            <a className="nav-web footer-web" href="./index.html">
              Pets Rescue Network Footer
            </a>
            <address>
              <ul className="list">
                <li className="footer-li">
                  <a
                    className="footer-address"
                    href="https://goo.gl/maps/BYtRj1dd29ztW6SMA"
                    target="_blank"
                  >
                    {" "}
                    г. Киев, пр-т Леси Украинки, 26{" "}
                  </a>
                </li>
                <li className="footer-li">
                  {" "}
                  <a
                    className="footer-link"
                    href="mailto:info@devstudio.com"
                    lang="en"
                  >
                    info@devstudio.com{" "}
                  </a>
                </li>
                <li className="footer-li">
                  {" "}
                  <a className="footer-link" href="tel:+380961111111">
                    {" "}
                    +38 096 111 11 11{" "}
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>
      </footer>
    </>
  )
}
