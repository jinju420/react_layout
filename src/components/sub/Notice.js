import Layout from '../common/Layout';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
/*
	localStorage
	-각 브라우저에 있는 로컬 저장공간
	-문자값만 저장가능 (문자값이 아닌 데이터 json -> 문자화해서 저장)
	-5MB 까지만 저장 가능한 경량의 저장공간
	-{key: '문자값'}
	-localStorage.setItem({key:'문자값'}) - 값 저장
	-localStorage.getItem(key) - 값 불러오기
*/

function Notice() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};
	const input = useRef(null);
	const textarea = useRef(null);
	//수정모드에서의 input, textarea가 담길 참조객체
	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);
	//localStorage의 반환값을 Posts의 초기값으로 지정
	const [Posts, setPosts] = useState(getLocalData());
	//Allowd값이 true일떄만 수정모드 진입 가능
	const [Allowed, setAllowed] = useState(true);

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
		/*		
		모션 중 재이벤트 방지 /처음에 실행될땐 무시됨 왜냐면 Allowed 초기값이 true기 때문에 그리고 두번째 실행될땐 return실행
		1. 초기state값이 trues니까 if문 무시되고 setPosts실행 후
		2. setAllowed(false);로 다른 edit버튼 실행 안되게 바로 막아줌
		3. update버튼 누르면 posts가 새로 업데이트 되고 setAllowed(true);로 줘서 다른 글 수정 가능하게 함
		4. 그리고 다시 수정모드 누르면 if (!Allowed) return;
		 */
		if (!Allowed) return;
		setPosts(
			Posts.map((post, postIndex) => {
				/*기존 Posts를 반복을 돌면서 현재 반복도는 post의 순번(postIndex)과 파라미터로 전달받은 수정할 post의 순번(editIndex)이 같으면
				 **해당 post객체에만 enableUpdate = true라는 정보값을 추가해서 반환 */
				if (postIndex === editIndex) post.enableUpdate = true;
				return post;
			})
		);
		//일단 수정모드에 진입하면 allowed값을 false로 바꿔서 다른글의 수정모드 진입을 방지
		setAllowed(false);
	};

	//post 출력모드 변경함수
	const disableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, postIndex) => {
				if (postIndex === editIndex) post.enableUpdate = false;
				return post;
			})
		);
		setAllowed(true);
	};

	//post 수정함수
	const updatePost = (updateIndex) => {
		if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
			return alert('수정할 제목과 본문을 모두 입력하세요');
		}
		setPosts(
			Posts.map((post, postIndex) => {
				//현재 반복도는 post순번과 파라미터로 전달받은 수정할 포스트 순번이 같으면
				if (postIndex === updateIndex) {
					//수정모드에서 입력한 input, textarea값으로 기존 포스트 제목, 본문을 변경
					post.title = inputEdit.current.value;
					post.content = textareaEdit.current.value;
					//출력모드로 다시 변경
					post.enableUpdate = false;
				}
				return post;
			})
		);
		//수정 완료시 다시 다른글 수정모드로 진입할 수 있게 수정
		setAllowed(true);
	};

	useEffect(() => {
		//Posts값이 변경될때마다 해당 데이터를 문자화해서 다시 localStorage에 저장
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout name={'NOTICE'}>
			<div className='wrap'>
				<div className='notice_title'>
					<h2>
						Inside the drawer, which had never been opened, there was a familiar smell of minutes between scarves, accessories,
						and various miscellaneous things.
					</h2>
				</div>
				<div className='notice_box'>
					<div className='inputBox'>
						<div className='txt_box'>
							<input type='text' placeholder='제목을 입력하세요' ref={input} />
							<br />
							<textarea cols='30' rows='3' placeholder='본문을 입력하세요' ref={textarea}></textarea>
						</div>

						<br />

						<div className='btnSet'>
							<button onClick={resetForm}>CANCEL</button>
							<button onClick={createPost}>WRITE</button>
						</div>
					</div>
				</div>
			</div>

			<div className='showBox'>
				<p>The Newest</p>
				<div className='txt_box'>
					{Posts.map((post, idx) => {
						return (
							<article key={idx}>
								{post.enableUpdate ? (
									//현재 반복도는 post가 enableUpdate값이 true면
									//수정모드 렌더링
									<>
										<div className='txt'>
											<input type='text' defaultValue={post.title} ref={inputEdit} />
											<br />
											<textarea cols='30' rows='3' defaultValue={post.content} ref={textareaEdit}></textarea>
										</div>

										<div className='btnSet'>
											<button onClick={() => disableUpdate(idx)}>CANCEL</button>
											<button
												onClick={() => {
													updatePost(idx);
												}}
											>
												UPDATE
											</button>
										</div>
									</>
								) : (
									//현재 반복도는 post에 enableUpdate값이 없거나 false면
									//출력모드 렌더링
									<>
										<div className='txt'>
											<span>
												{'0' + (idx + 1)}
												{/* <FontAwesomeIcon icon={faCircleCheck} /> */}
											</span>
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
			</div>
		</Layout>
	);
}

export default Notice;
