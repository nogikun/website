import { useTranslation } from "react-i18next";

function Language() {
	const { t, i18n } = useTranslation();

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	return (
		<div>
			<p>{t("language")}</p>
			<p>{t("body.explanation.line1")}</p>
			<button type="button" onClick={() => changeLanguage("en")}>
				English
			</button>
			<button type="button" onClick={() => changeLanguage("ja")}>
				日本語
			</button>
		</div>
	);
}

export default Language;
