# &lt;Masonry&gt;&lt;/Masonry&gt;
A container in which the items are laid out one after the other in the inline (or block) direction.

If you have a collection of images, each has different aspect ratio, the Masonry layout is a good choice.

## Preview

```jsx
<Masonry tag='div' theme='primary' size='lg' orientation='block'>
	<img src="..." alt="..." />
	<img src="..." alt="..." />
	<img src="..." alt="..." />
	<img src="..." alt="..." />
	<img src="..." alt="..." />
	<img src="..." alt="..." />
	<img src="..." alt="..." />
</Masonry>
```
Rendered to:
```html
<div class="c1 thPrimary szLg block">
	<img src="..." alt="..." />
	<img src="..." alt="..." />
	<img src="..." alt="..." />
	<img src="..." alt="..." />
	<img src="..." alt="..." />
	<img src="..." alt="..." />
	<img src="..." alt="..." />
</div>
```

## Features
* Includes all features in [`<Content />`](https://www.npmjs.com/package/@nodestrap/content).
* Vertical orientation (block, default) -or- horizontal orientation (inline).
* Automatically rebuilds the layout when resizing, items added/removed, and items resized.
* Customizable via [`@cssfn/css-config`](https://www.npmjs.com/package/@cssfn/css-config).

## Installation

Using npm:
```
npm i @nodestrap/masonry
```

## Support Us

If you feel our lib is useful for your projects,  
please make a donation to avoid our project from extinction.

We always maintain our projects as long as we're still alive.

[[Make a donation](https://ko-fi.com/heymarco)]
