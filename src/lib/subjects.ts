import type { AutocompleteOption } from "@skeletonlabs/skeleton";

type Subject = {
	name: string;
	keywords: string;
};

// TODO: fill in more subjects
const subjects: Subject[] = [
	{
		name: 'English',
		keywords: 'english, language, literature'
	},
	{ name: 'Maths', keywords: 'math, mathematics, algebra, geometry, calculus' },
	{
		name: 'Computer Science',
		keywords: 'cs, computing, programming, coding'
	},
    {
        name: "German",
        keywords: "deutsch, germany, deutschland"
    }
];

export default function getSubjects(): AutocompleteOption<string>[] {
	// TODO: do this at compile time
	return subjects.map((subject) => {
		return {
			label: subject.name,
			value: subject.name,
			keywords: subject.keywords
		}	
	})
}
