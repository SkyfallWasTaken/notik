<script lang="ts">
	import { PencilLine, GraduationCap } from 'lucide-svelte';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings, AutocompleteOption } from '@skeletonlabs/skeleton';
	import getSubjects from '$lib/subjects';
	import NewCard from '$lib/components/new/NewCard.svelte';
	import Editor from '$lib/components/Editor.svelte';

	let deckSubject = '';
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom-start'
	};

	let availableSubjects: AutocompleteOption<string>[] = getSubjects();

	function onSubjectSelect(event: CustomEvent<AutocompleteOption<string>>) {
		deckSubject = event.detail.value;
	}
</script>

<div class="container mx-auto flex justify-center">
	<div class="space-y-5 text-center">
		<div class="text-left space-y-2">
			<h1 class="text-3xl font-semibold pb-4">Create new deck</h1>
			<label for="deckName">
				<span class="sr-only">Deck name</span>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim"><PencilLine /></div>
					<input type="text" placeholder="e.g. 'Essen'" id="deckName" />
				</div>
			</label>

			<div class="card p-2 z-10" data-popup="popupAutocomplete">
				<Autocomplete
					bind:input={deckSubject}
					options={availableSubjects}
					on:selection={onSubjectSelect}
					regionEmpty="p-2"
					emptyState="No results found."
				/>
			</div>

			<label for="deckSubject">
				<span class="sr-only">Subject</span>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim"><GraduationCap /></div>
					<input
						class="autocomplete"
						type="search"
						name="autocomplete-search"
						bind:value={deckSubject}
						placeholder="Search subjects..."
						use:popup={popupSettings}
					/>
				</div>
			</label>
		</div>

		<hr class="opacity-50" />

		<Editor />

		<NewCard />
	</div>
</div>
