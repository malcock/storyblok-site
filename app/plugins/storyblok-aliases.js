// StoryblokComponent first looks a block up by its raw name (e.g. "text_section")
// and logs an error when that fails, before falling back to the kebab-case name.
// Registering the snake_case names directly keeps the logs clean.
import {
	ElsewhereItem,
	FeaturedWork,
	LinkItem,
	OptionItem,
	OptionsCompared,
	SequenceStep,
	TextSection,
	WhatHappenedNext,
	WorkHistory,
} from '#components';

export default defineNuxtPlugin((nuxtApp) => {
	const aliases = {
		elsewhere_item: ElsewhereItem,
		featured_work: FeaturedWork,
		link_item: LinkItem,
		option_item: OptionItem,
		options_compared: OptionsCompared,
		sequence_step: SequenceStep,
		text_section: TextSection,
		what_happened_next: WhatHappenedNext,
		work_history: WorkHistory,
	};
	for (const [name, component] of Object.entries(aliases)) {
		nuxtApp.vueApp.component(name, component);
	}
});
