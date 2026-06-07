---
layout: post
title: C#에서 트리 구현하기
date: 2026-05-07
categories: C# Unity
---
```cs
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Code.Core.Collections.Generic {
    [Serializable]
    public class SerializableTree<T> : IEnumerable<SerializableTree<T>> {
        [SerializeReference] public List<SerializableTree<T>> children = new();
        public T value;

        public IEnumerator<SerializableTree<T>> GetEnumerator() {
            yield return this;
            foreach (var child in children) {
                yield return child;
            }
        }

        public void FillChildren() {
            for (var i = 0; i < children.Count; i++) {
                var child = children[i];
                if (child == null) {
                    children[i] = new SerializableTree<T>();
                    continue;
                }

                child.FillChildren();
            }
        }

        IEnumerator IEnumerable.GetEnumerator() {
            return GetEnumerator();
        }
    }
}
```

