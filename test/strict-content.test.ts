import { Changeset, ValidatedChangeset, ValidationChangesetFactory } from '../src';
import strictRecord from './support/strict-record';

const factories = {
  Changeset: (obj: object) => Changeset(obj),
  ValidatedChangeset: (obj: object) => new ValidatedChangeset(obj),
  ValidationChangesetFactory: (obj: object) => ValidationChangesetFactory(obj)
};

describe('Unit | strict content', () => {
  Object.entries(factories).forEach(([name, create]) => {
    describe(name, () => {
      it('reads a field the content has', () => {
        const dummy: any = create(strictRecord({ title: 'About' }));

        expect(dummy.get('title')).toBe('About');
      });

      it('reads a field the content has but has not set', () => {
        const dummy: any = create(strictRecord({ title: undefined }));

        expect(dummy.get('title')).toBeUndefined();
      });

      it('does not ask the content for a key it does not have', () => {
        const dummy: any = create(strictRecord({ title: 'About' }));

        expect(dummy.get('unknownProperty')).toBeUndefined();
      });

      it('reads a changed field without asking the content', () => {
        const dummy: any = create(strictRecord({ title: 'About' }));

        dummy.set('slug', 'about');

        expect(dummy.get('slug')).toBe('about');
      });
    });
  });
});
