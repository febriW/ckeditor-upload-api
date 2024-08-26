import { useState, useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import 'ckeditor5/ckeditor5.css'
import './css/rte.css'

import {
	ClassicEditor,
	AccessibilityHelp,
	AutoImage,
	AutoLink,
	Autosave,
	Bold,
	Essentials,
	ImageBlock,
	ImageCaption,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Italic,
	Link,
	LinkImage,
	Paragraph,
	SelectAll,
	SimpleUploadAdapter,
	Undo
} from 'ckeditor5';

const RichTextEditor = ({content}) => {
	const editorContainerRef = useRef(null)
	const editorRef = useRef(null)
	const [isLayoutReady, setIsLayoutReady] = useState(false)
	const [textEditor, setTextEditor] = useState("")

	useEffect(() => {
		setIsLayoutReady(true);
		return () => setIsLayoutReady(false);
	}, [])

	useEffect(() => {
		content(textEditor ?? '')
    },[textEditor])

	const editorConfig = {
		toolbar: {
			items: ['undo', 'redo', '|', 'selectAll', '|', 'bold', 'italic', '|', 'link', 'insertImage', '|', 'accessibilityHelp'],
			shouldNotGroupWhenFull: false
		},
		plugins: [
			AccessibilityHelp,
			AutoImage,
			AutoLink,
			Autosave,
			Bold,
			Essentials,
			ImageBlock,
			ImageCaption,
			ImageInsert,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			Italic,
			Link,
			LinkImage,
			Paragraph,
			SelectAll,
			SimpleUploadAdapter,
			Undo
		],
		image: {
			toolbar: [
				'toggleImageCaption',
				'imageTextAlternative',
				'|',
				'imageStyle:alignBlockLeft',
				'imageStyle:block',
				'imageStyle:alignBlockRight',
				'|',
				'resizeImage'
			],
			styles: {
				options: ['alignBlockLeft', 'block', 'alignBlockRight']
			}
		},
        link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
		},
		simpleUpload: {
			uploadUrl: 'http://localhost:8080/upload',
		},
		placeholder: 'Type or paste your content here!'
	};

	return (
		<div>
			<div className="main-container">
				<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
					<div className="editor-container__editor">
						<div ref={editorRef}>{isLayoutReady && <CKEditor editor={ClassicEditor} config={editorConfig} 
						onChange={(event, editorData) => {
							const data = editorData.getData()
							setTextEditor(data)
						}} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RichTextEditor
