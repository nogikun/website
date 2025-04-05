import { useState } from "react";

// local imports

// images
import viteLogo from "/vite.svg";
import mainBackground from "../assets/Home/mainBackground.png";
import reactLogo from "../assets/react.svg";
import { Top } from "../text/Text";

const Home = () => {
	const [count, setCount] = useState<number>(0);
	return (
		<>
			<div>
				<h1>{Top.title}</h1>
			</div>
			<div>
				<a href="https://vite.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<div className="card">
				<button type="button" onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
			<img src={mainBackground} alt="bg-image" style={{ width: "700px" }} />

			<div>
				<h1>I'm NOGI!</h1>
			</div>

			<div>
				<p>-はじめに-</p>
				<p>まずここでは自己紹介をしたいと思います。</p>
				<p>こんにちは！</p>
				<p>私の名前は禾(のぎ)と申します。</p>
				<p>現在、大学生でAIを専攻しています。</p>
				<p>絵を描くのが好きで、</p>
				<p>
					普段はX ( <a href="https://twitter.com/nogikun_">@nogikun_</a>{" "}
					)に投稿しています。
				</p>
				<br />
				<p>また、ここでは自分の絵などを掲載できたらなと思います。</p>
				<p>お手すきの際にどうぞ。</p>
			</div>
		</>
	);
};

export default Home;
