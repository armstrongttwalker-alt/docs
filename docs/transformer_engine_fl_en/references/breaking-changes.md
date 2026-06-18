# Breaking Changes

## v1.7: Padding mask definition for PyTorch

In an effort to unify the definition and usage of the attention mask across all three frameworks in Transformer Engine, the padding mask has changed from `True` meaning inclusion of the corresponding position in attention to exclusion of that position in our PyTorch implementation. Since v1.7, all attention mask types follow the same definition where `True` means masking out the corresponding position and `False` means including that position in attention calculation.

An example of this change is:

```
# for a batch of 3 sequences where `a`s, `b`s and `c`s are the useful tokens
# and `0`s are the padding tokens,
[a, a, a, 0, 0,
 b, b, 0, 0, 0,
 c, c, c, c, 0]
# the padding mask for this batch before v1.7 is,
[ True,  True,  True, False, False,
  True,  True, False, False, False,
  True,  True,  True,  True, False]
# and for v1.7 onwards it should be,
[False, False, False,  True,  True,
 False, False,  True,  True,  True,
 False, False, False, False,  True]
```
