function ErrorPage() {
    return (
        <div className="error">
            <h1 className="error__tittle">404</h1>
            <p className="error__description">Страница не найдена</p>
            <a className="link error__link" href="javascript:history.back()">Назад</a>
        </div>
    )
}

export default ErrorPage;