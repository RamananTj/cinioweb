import CoolSkeletonShooter from "./components/Error/CoolSkeletonShooter";

function GlobalErrorPage() {
    return (
        <main className="error-page">

            <CoolSkeletonShooter />
            <h1>Oops! Something went wrong.</h1>
            <p>Looks like something broke!</p>
            <a href="/">Back to Home</a>
        </main>
    );
}

export default GlobalErrorPage;