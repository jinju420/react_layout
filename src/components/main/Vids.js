import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const { youtube } = useSelector((store) => store.youtubeReducer);
	console.log(youtube);
	return (
		<section id='vids' className='myScroll'>
			<h1>Youtube</h1>
			<div className='inner'>
				{youtube.map((vid, idx) => {
					if (idx >= 4) return null;
					// const tit = vid.snippet.title;
					// const desc = vid.snippet.description;
					// const date = vid.snippet.publishedAt;
					return (
						<article key={vid.id}>
							<div className='pic'>
								<img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} />
							</div>
							{/* <div className='txt'>
								<h3>{tit.length > 40 ? tit.substr(0, 30) + '...' : tit}</h3>
								<p>{desc.length > 100 ? desc.substr(0, 80) + '...' : desc}</p>
								<span>{date.split('T')[0]}</span>
							</div> */}
						</article>
					);
				})}
			</div>
		</section>
	);
}

export default memo(Vids);
/*
store라는 전역데이터를 저장할 컴포넌트 생성
const store=createStore(reducers);

reducers에는 유투브, 필러커 등 데이터를 담고 있는걸 담는거
const reducers =combineReducers({youtubeReducer,fluckrReducer})
	useSelector => store라는 전역데이터를 가지고올 때 쓰는 함수
	const Vids = useSelector((store)=>store.youtubueReducer.youtube);

	useDispatch()=>반드시 action이라는 객체를 가지고 reducer에 변형될 데이터를 전송하는 함수
	reducer에  요청하기위해  action이라는 객체를 전송해주는 함수
	cosst dispatch=useDispatch();

*/
