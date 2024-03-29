import { Link } from 'react-router-dom';
import './Error404.css'

const Error404 = () => {

    return (
        <main className="error404">
            <section className="sectionErrorPage">
                <h1>Désolé la page que vous cherchez a été volé par Chuck Norris<br></br> et on a pas osé lui demander de nous la rendre. </h1>
                <Link href="/">Retourner à l'acceuil</Link>
            </section>
        </main>
    )
}

export default Error404;