import Link from 'next/link';
export default function Footer(props) {
  return (
    <footer className="footerStyle">
      <div className="iconbar">
        <div>
          <Link href={'https://github.com/anastasiia-lk'}>
            <a>
              <img
                src="github.png"
                alt="Github logo"
                width="50vw"
                height="50vh"
              />
            </a>
          </Link>
        </div>
        <div>
          <Link href={'https://www.linkedin.com/in/anastasiia-duplishcheva/'}>
            <a>
              <img
                src="linkedin.png"
                alt="Linkedin logo"
                width="50vw"
                height="50vh"
              />
            </a>
          </Link>
        </div>
        <div>
          <Link
            href={
              'https://mail.google.com/mail/?view=cm&source=mailto&to=a.duplishcheva@gmail.com'
            }
          >
            <a>
              <img src="mail.png" alt="Mail logo" width="50vw" height="50vh" />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
