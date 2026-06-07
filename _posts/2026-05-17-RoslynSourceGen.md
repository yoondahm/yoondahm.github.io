---
layout: post
title: 유니티에서의 소스 제네레이터 활용
date: 2026-05-17
categories: Unity 소스제네레이터
---
개인 프로젝트를 진행하는데, `InputService`에서 이런 코드가 있었다.
```cs
private void InitializeDictionary() {
	_bindings[InputButton.Jump] = _controls.Player.Jump;
	_bindings[InputButton.Attack] = _controls.Player.Attack;
	_bindings[InputButton.Sliding] = _controls.Player.Sliding;
}
```
입력 리바인딩을 위해 `Dictionary<InputButton, InputAction>`에 `enum`값에 맞는 `InputAction`을 매핑해 주는 코드였는데, 당장은 인풋의 종류가 많지 않아 문제될 것이 없지만 추후 버튼이 추가됨에 따라 저 코드의 양도 늘어나게 되면 귀찮음과 실수를 유발하게 될 것 같았다.

사실 저 정도의 코드는 직접 적어도 별 문제는 없겠지만, 무엇보다 전에 공부했던 기술인 `SourceGenerator`를 통해 자동화 해보고 싶었다.

## SourceGenerator란
`SourceGenerator`는 컴파일 과정에서 원하는 코드를 끼워 넣을 수 있는 기능이다. 과거엔 코드 자동화를 위해 `ExpressionTree`(식 트리)나 `Reflection.Emit`(IL)등으로 런타임에 동적으로 컴파일했다고 하는데, 요즘은 대체로 `SourceGenerator`쪽이 더 선호되는 것 같다. 물론 각각의 기능은 작동 방식 자체가 다르며, 사용처가 다르다.

식 트리나 `Reflection.Emit`등과 달리 `SourceGenerator`는 컴파일 타임에 코드 생성이 이루어지므로 런타임 오버헤드 자체가 아예 없다. 또한 둘을 써본 사람은 알겠지만 식 트리와 IL은 미친 디버깅 난이도를 자랑한다. 당장 단적인 예로 a + b를 만들고 싶으면
```cs
// int a
var a = Expression.Parameter(typeof(int), "a");
// int b
var b = Expression.Parameter(typeof(int), "b");
// a + b
var body = Expression.Add(a, b);
// (a, b) => a + b
var lambda = Expression.Lambda<Func<int, int, int>>(
	body,
	a,
	b
);

Func<int, int, int> func = lambda.Compile();
Console.WriteLine(func(3, 5));
```
이렇게 써야 한다. 반면 `SourceGenerator`는 실제 C# 코드를 그대로 쓰면 되기 때문에 훨씬 이지까까 하다고 할 수 있다.