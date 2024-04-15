<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Typography from '@tiptap/extension-typography';
	import Placeholder from '@tiptap/extension-placeholder';
	import Document from '@tiptap/extension-document'

	let element: HTMLDivElement;
	let editor: Editor;

	const CustomDocument = Document.extend({
		content: 'heading block*'
	});

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				CustomDocument,
				StarterKit.configure({
					document: false
				}),
				Typography.configure({
					multiplication: false,
					openDoubleQuote: false // Causes issues with blockquotes
				}),
				Placeholder.configure({
					placeholder: ({ node }) => {
						if (node.type.name === 'heading') {
							return "What's the title?";
						}

						return "Type '/' for commands...";
					}
				})
			],
			editorProps: {
				attributes: {
					class:
						'prose prose-quoteless dark:prose-invert prose-sm sm:prose-base md:prose-md focus:outline-none [&>*]:mb-1 text-left'
				}
			},

			content: '<h1></h1>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class="btn btn-sm"
		class:variant-filled={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class="btn btn-sm"
		class:variant-filled={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class="btn btn-sm"
		class:variant-filled={editor.isActive('paragraph')}
	>
		P
	</button>
{/if}

<div id="test"><div bind:this={element} /></div>

<style>
	:global(.tiptap p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		color: #ced4da;
		pointer-events: none;
		height: 0;
	}

	/* Placeholder (on every new line) */
	:global(.tiptap .is-empty::before) {
		content: attr(data-placeholder);
		float: left;
		pointer-events: none;
		height: 0;
		@apply text-slate-200;
	}
</style>
