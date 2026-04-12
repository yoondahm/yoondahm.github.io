---
layout: post
title: 코드 하이라이팅 테스트
date: 2026-04-12
categories: Test
---
C#:
```cs
using System;
using System.Collections.Generic;

namespace Code.Core.Collections.Generic {
    public class PriorityQueue<TElement, TPriority> where TPriority : IComparable<TPriority> {
        private readonly List<(TElement Element, TPriority Priority)> _heap = new();

        public int Count => _heap.Count;

        public void Enqueue(TElement element, TPriority priority) {
            _heap.Add((element, priority));
            int c = _heap.Count - 1; // 이건 주석이야.
            while (c > 0) {
                int p = (c - 1) / 2;
                if (_heap[c].Priority.CompareTo(_heap[p].Priority) >= 0) {
                    break;
                }

                (_heap[c], _heap[p]) = (_heap[p], _heap[c]);
                c = p;
            }
        }

        public bool Dequeue(out TElement element, out TPriority priority) {
            return DequeueAt(0, out element, out priority);
        }

        public bool DequeueAt(int index, out TElement element, out TPriority priority) {
            if (index < 0 || index >= _heap.Count) {
                element = default;
                priority = default;
                return false;
            }

            (element, priority) = _heap[index];
            var last = _heap[^1];
            _heap.RemoveAt(_heap.Count - 1);
            if (_heap.Count == 0) {
                return true;
            }

            _heap[index] = last;
            int p = index;
            while (true) {
                int c1 = 2 * p + 1;
                int c2 = 2 * p + 2;
                int min = p;

                if (c1 < _heap.Count && _heap[c1].Priority.CompareTo(_heap[min].Priority) < 0) {
                    min = c1;
                }

                if (c2 < _heap.Count && _heap[c2].Priority.CompareTo(_heap[min].Priority) < 0) {
                    min = c2;
                }

                if (min == p) {
                    break;
                }

                (_heap[p], _heap[min]) = (_heap[min], _heap[p]);
                p = min;
            }

            return true;
        }

        public void Clear() => _heap?.Clear();

        public bool Peek(out TElement element, out TPriority priority) {
            if (_heap.Count == 0) {
                element = default;
                priority = default;
                return false;
            }

            (element, priority) = _heap[0];
            return true;
        }
    }
}
```

C++:
```cpp
#include<iostream>
#include<conio.h>
#include<Windows.h>
using namespace std;

enum class Scene
{
	TITLE, BATTLE, RESULT
};
enum class ActionType
{
	ATTACK = 1, HEAL
};
void Init(Scene& scene, int& playerHp, int& slimeHp);
void Update(Scene& scene, int& playerHp, int& slimeHp, bool& isRunning);
void Render(Scene scene, int playerHp, int slimeHp);
int GetValidInput(int min, int max);
int main()
{
	srand((unsigned int)time(nullptr));
	Scene scene;
	int playerHp = 0, slimeHp = 0;
	bool isRunning = true;

	Init(scene, playerHp, slimeHp);
	while (isRunning)
	{
		Update(scene, playerHp, slimeHp, isRunning);
		Render(scene, playerHp, slimeHp);
	}
}

void Init(Scene& scene, int& playerHp, int& slimeHp)
{
	scene = Scene::TITLE;
	playerHp = 50;
	slimeHp = 30;
	system("cls");
	cout << "============================" << endl;
	cout << "   < 슬라임 잡기 게임 >   " << endl;
	cout << "============================" << endl;
	cout << "아무 키나 누르면 시작합니다..." << endl;
	_getch();
	scene = Scene::BATTLE;
}

void Update(Scene& scene, int& playerHp, int& slimeHp, bool& isRunning)
{
	if (scene == Scene::BATTLE)
	{
		cout << "행동 선택(1. 공격, 2. 회복): ";
		ActionType act = (ActionType)GetValidInput(1, 2);

		if (act == ActionType::ATTACK)
		{
			int dmg = rand() % 10 + 5; // 5 ~ 14
			slimeHp -= dmg;
			cout << endl << "[공격 성공] 슬라임에게" << dmg << "데미지!" << endl;
		}

		else if (act == ActionType::HEAL)
		{
			playerHp += 15;
			cout << endl << "[체력 회복] 15 증가" << endl;
		}

		if (slimeHp > 0)
		{
			if (rand() % 100 < 50)
			{
				playerHp -= 8;
				cout << endl << "[피격] 플레이어가 8 데미지 받음 " << endl;
			}
			else
				cout << "[MISS]" << endl;
		}
		Sleep(1000);
		if (playerHp <= 0 || slimeHp <= 0)
			scene = Scene::RESULT;
	}
	else if (scene == Scene::RESULT)
	{
		cout << "게임을 다시 시작하시겠습니까?(Y/N)" << endl;
		char ch = _getch();
		if (ch == 'y' || ch == 'Y')
		{
			Init(scene, playerHp, slimeHp);
		}
		else if(ch== 'n' || ch =='N')
		{
			cout << "프로그램 종료" << endl;
			isRunning = false;
		}
	}
}

void Render(Scene scene, int playerHp, int slimeHp)
{
	system("cls");
	if (scene == Scene::BATTLE)
	{
		cout << "--- [ 전투 진행 중 ] ---" << endl;
		cout << "플레이어 체력" << playerHp << "| 슬라임 체력:" << slimeHp << endl << endl;
	}
	else if (scene == Scene::RESULT)
	{
		cout << "--- [ 최종 결과 ] ---" << endl;
		if (playerHp > 0)
		{
			cout << "승리! 플레이어가 생존에 성공했습니다." << endl;
		}
		else
		{
			cout << "패배... 플레이어가 쓰러졌습니다." << endl;
		}
	}
}

int GetValidInput(int min, int max)
{
	int input;
	while (true)
	{
		cin >> input;
		if (cin.fail() || input < min || input > max)
		{
			cin.clear();
			cin.ignore(1000, '\n');
			cout << "잘못된 입력입니다. " << min << "~"
				<< max << "사이 숫자를 입력하세요. " << endl;
			continue;
		}
		else
			return input;
	}
}
```
