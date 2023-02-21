import Layout from '../common/Layout';
import { useState, useRef, useEffect } from 'react';

function Notice() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);
	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};
	const createPost = () => {
		//!==값이 없을 때
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요');
		}
		//조건문이 맞지 않으면 무시하고 setPosts실행
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		resetForm();
	};

	//post삭제함수
	const deletePost = (delIndex) => {
		/* window.confirm은 true, false의 boolean값을 반환
		1. 경고창에서 확인 클릭시 true반환되면서 해당 if문의 return이 무시되고 아래쪽의 글 삭제문이 실행됨
		2. 경고창에서 아니오 클릭시 false값이 반환되면서 해당 if문의 return이 실행되고 아래쪽의 글(setPosts) 삭제문의 무시됨*/
		if (!window.confirm('해당 게시글을 삭제하시겠습니까?')) return;
		/*삭제순번이 index파라미터로 전달됨 => post배열에서 반복돌면서 현재 반복되는 순번이랑 파라미터로 전달된 index순번이 같지 않은 나머지것들만 반환 
		**filter자체가 기존 배열을 deep copy하면서 새롭게 필터링된 배열을 반환하는 메서드 이므로 기존 posts를 전개 연산자로 카피할 필요가 없다.
		delIndex랑 onClick={() => deletePost(idx)랑 같음 */
		setPosts(Posts.filter((_, postIndex) => postIndex !== delIndex));
	};

	//post 수정모드 변경함수
	const enableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, postIndex) => {
				/*기존 Posts를 반복을 돌면서 현재 반복도는 post의 순번(postIndex)과 파라미터로 전달받은 수정할 post의 순번(editIndex)이 같으면
				 **해당 post객체에만 enableUpdate = true라는 정보값을 추가해서 반환 */
				if (postIndex === editIndex) post.enableUpdate = true;
				return post;
			})
		);
	};

	//post 출력모드 변경함수
	const disableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, postIndex) => {
				if (postIndex === editIndex) post.enableUpdate = false;
				return post;
			})
		);
	};
	useEffect(() => {
		console.log(Posts);
	}, [Posts]);
	return (
		<Layout name={'NOTICE'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea
					cols='30'
					rows='3'
					placeholder='본문을 입력하세요'
					ref={textarea}
				></textarea>
				<br />

				<div className='btnSet'>
					<button onClick={resetForm}>CANCEL</button>
					<button onClick={createPost}>WRITE</button>
				</div>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								//현재 반복도는 post가 enableUpdate값이 true면
								//수정모드 렌더링
								<>
									<div className='txt'>
										<input type='text' defaultValue={post.title} />
										<br />
										<textarea
											cols='30'
											rows='3'
											defaultValue={post.content}
										></textarea>
									</div>

									<div className='btnSet'>
										<button onClick={() => disableUpdate(idx)}>CANCEL</button>
										<button>UPDATE</button>
									</div>
								</>
							) : (
								//현재 반복도는 post에 enableUpdate값이 없거나 false면
								//출력모드 렌더링
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>

									<div className='btnSet'>
										{/* 수정 버튼 클릭시 수정할 글의 순번을 enableUpdate함수의 인수로 전달 */}
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										{/* deletePost(idx) 이렇게 쓰면 클릭하기도 전에 함수 호출되기때문에 랩핑함수로 감싸서 쓴다.
									삭제버튼 클릭 시 삭제할 글의 순번을 deletePost함수에 전달
									idx === delIndex 와 동일
								*/}
										<button onClick={() => deletePost(idx)}>DELETE</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Notice;
