import { Changeset, ValidatedChangeset, ValidationChangesetFactory } from '../src';
import { checkout } from '@warp-drive/core/reactive';
import schemaRecord from './support/schema-record';

const factories = {
  Changeset: (obj: object) => Changeset(obj),
  ValidatedChangeset: (obj: object) => new ValidatedChangeset(obj),
  ValidationChangesetFactory: (obj: object) => ValidationChangesetFactory(obj)
};

describe('Unit | strict content', () => {
  Object.entries(factories).forEach(([name, create]) => {
    describe(name, () => {
      it('reads a field the content has', () => {
        const dummy: any = create(schemaRecord('page', { title: 'About' }));

        expect(dummy.get('title')).toBe('About');
      });

      it('reads a field the content has but has not set', () => {
        const dummy: any = create(schemaRecord('page', {}));

        expect(dummy.get('title')).toBeUndefined();
      });

      it('does not ask the content for a key it does not have', () => {
        const dummy: any = create(schemaRecord('page', { title: 'About' }));

        expect(dummy.get('unknownProperty')).toBeUndefined();
      });

      it('reads a field off function content', () => {
        const dummy: any = create(Object.assign(function () {}, { title: 'About' }));

        expect(dummy.get('title')).toBe('About');
      });

      it('treats content that forwards unknown keys as having every key', () => {
        const content = { unknownProperty: () => 'forwarded' };
        const dummy: any = create(content);

        expect(dummy.contentHasKey(content, 'name')).toBe(true);
      });

      it('reads a changed field whose value is a schema record', () => {
        const dummy: any = create(schemaRecord('page', { title: 'About', owner: null }));
        const owner = schemaRecord('user', { name: 'Ada' });

        dummy.set('owner', owner);

        expect(dummy.get('owner')).toBe(owner);
      });

      it('sets a nested field', () => {
        const dummy: any = create(schemaRecord('page', { owner: { name: 'Ada' } }));

        dummy.set('owner.name', 'Bob');

        expect(dummy.get('owner.name')).toBe('Bob');
      });

      it('writes its changes to an editable record', async () => {
        const page: any = await checkout(schemaRecord('page', { title: 'About' }));
        const dummy: any = create(page);

        dummy.set('title', 'Contact');
        dummy.execute();

        expect(page.title).toBe('Contact');
      });

      it('reads a changed field without asking the content', () => {
        const dummy: any = create(schemaRecord('page', { title: 'About' }));

        dummy.set('slug', 'about');

        expect(dummy.get('slug')).toBe('about');
      });
    });
  });
});
