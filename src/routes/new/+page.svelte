<script lang="ts">
	import { PencilLine, GraduationCap } from 'lucide-svelte';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings, AutocompleteOption } from '@skeletonlabs/skeleton';
	import NewCard from '$lib/components/new/NewCard.svelte';

	let deckSubject = '';
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom-start'
	};

	let availableSubjects: AutocompleteOption<string>[] = [
		{
			label: 'Computer Science',
			value: 'computerscience',
			keywords: 'cs, computing, programming, coding'
		},
		{ label: 'English', value: 'english', keywords: 'english, language, literature' },
		{ label: 'Maths', value: 'maths', keywords: 'math, mathematics, algebra, geometry, calculus' }
	];

	function onSubjectSelect(event: CustomEvent<AutocompleteOption<string>>) {
		deckSubject = event.detail.value;
	}
</script>

<div class="container mx-auto flex justify-center">
	<div class="space-y-5 text-center">
		<div class="text-left space-y-2">
			<h1 class="text-3xl font-semibold">Create new deck</h1>
			<label for="deckName">
				<span class="sr-only">Deck name</span>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim"><PencilLine /></div>
					<input type="text" placeholder="e.g. 'German - Essen'" id="deckName" />
				</div>
			</label>

			<div class="card p-2 z-10" data-popup="popupAutocomplete">
				<Autocomplete
					bind:input={deckSubject}
					options={availableSubjects}
					on:selection={onSubjectSelect}
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

		<NewCard />
	</div>
</div>
