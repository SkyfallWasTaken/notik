<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Typography from '@tiptap/extension-typography';

	let element: HTMLDivElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit, Typography],
			editorProps: {
				attributes: {
					class:
						'prose dark:prose-invert prose-sm sm:prose-base md:prose-md focus:outline-none [&>*]:mb-1 text-left'
				}
			},

			content: '<p>Hello World! 🌍️ </p>',
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
	
</style>
