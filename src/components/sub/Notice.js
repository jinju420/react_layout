import Layout from '../common/Layout';
import { useState, useRef, useEffect } from 'react';

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
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요');
		}
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		resetForm();
	};

	//post삭제함수
	const deletePost = (delIndex) => {
		if (!window.confirm('해당 게시글을 삭제하시겠습니까?')) return;
		setPosts(Posts.filter((_, postIndex) => postIndex !== delIndex));
	};

	//post 수정모드 변경함수
	const enableUpdate = (editIndex) => {
		if (!Allowed) return;
		setPosts(
			Posts.map((post, postIndex) => {
				if (postIndex === editIndex) post.enableUpdate = true;
				return post;
			})
		);
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
				if (postIndex === updateIndex) {
					//수정모드에서 입력한 input, textarea값으로 기존 포스트 제목, 본문을 변경
					post.title = inputEdit.current.value;
					post.content = textareaEdit.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
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
							<input type='text' placeholder='Please enter a title' ref={input} />
							<br />
							<textarea cols='30' rows='3' placeholder='Please enter the Comments' ref={textarea}></textarea>
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
				<p>Newest</p>
				<div className='txt_box'>
					{Posts.map((post, idx) => {
						return (
							<article key={idx}>
								{post.enableUpdate ? (
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
									<>
										<div className='txt'>
											<span>{'0' + (idx + 1)}</span>
											<h2>{post.title}</h2>
											<p>{post.content}</p>
										</div>

										<div className='btnSet'>
											<button onClick={() => enableUpdate(idx)}>EDIT</button>
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
