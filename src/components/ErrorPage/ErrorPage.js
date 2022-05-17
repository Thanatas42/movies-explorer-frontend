function ErrorPage(props) {
    return (
        <div className="error">
            <h1 className="error__tittle">{props.errCode}</h1>
            <p className="error__description">{props.errName}</p>
            <a className="link error__link" href="javascript:history.back()">Назад</a>
        </div>
    )
}

export default ErrorPage;