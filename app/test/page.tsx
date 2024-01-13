"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from "./page.module.css"
import HideNav from '@/components/hideNav/HideNav'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

export default function Page() {
    type piece = "rook" | "knight" | "bishop" | "queen" | "king" | "pawn"

    type chessPiece = {
        id: number,
        piece: piece,
        currentPos: [number, number],
        validSquaresToMove: [number, number][],
        team: "black" | "white",
        points: number,
        movedAmount?: number,
        image: string
    }
    type newSquare = undefined | { state: null | chessPiece, position: [number, number] }

    const [playerTeamSelection, playerTeamSelectionSet] = useState<"black" | "white">("white")
    const [showingSettings, showingSettingsSet] = useState(false)
    const [gameMode, gameModeSet] = useState<"auto" | "manual" | "verse">("auto")

    const chessPieceStatChoices: {
        [key: string]: {
            piece: piece;
            points: number;
        }
    } = {
        "rook": {
            piece: "rook",
            points: 5
        },
        "knight": {
            piece: "knight",
            points: 3
        },
        "bishop": {
            piece: "bishop",
            points: 3
        },
        "queen": {
            piece: "queen",
            points: 9
        },
        "king": {
            piece: "king",
            points: 0
        },
        "pawn": {
            piece: "pawn",
            points: 1
        },
    }

    const chessBoardRef = useRef<HTMLDivElement>(null!)
    const checkingFinalMovesLeft = useRef(false)
    const autoPlayLoop = useRef<NodeJS.Timeout>()

    const [currentTurn, currentTurnSet] = useState<"black" | "white">("white")
    const [checkmatedKing, checkmatedKingSet] = useState<chessPiece>()
    const [staleMate, staleMateSet] = useState(false)
    const [kingInCheck, kingInCheckSet] = useState(false)
    const [enpassantInPlay, enpassantInPlaySet] = useState<{
        position: [number, number],
        pieceToCollect: chessPiece
    }>()
    const [canCastle, canCastleSet] = useState<{
        position: [number, number],
        pieceToCollect: chessPiece
    }[]>([])

    const getChessPieceImage = (piece: piece, team: "black" | "white") => {
        if (piece === "bishop") {
            return team === "black" ? require(`@/public/chess/bbishop.png`).default.src : require(`@/public/chess/wbishop.png`).default.src
        }

        if (piece === "king") {
            return team === "black" ? require(`@/public/chess/bking.png`).default.src : require(`@/public/chess/wking.png`).default.src
        }

        if (piece === "knight") {
            return team === "black" ? require(`@/public/chess/bknight.png`).default.src : require(`@/public/chess/wknight.png`).default.src
        }

        if (piece === "pawn") {
            return team === "black" ? require(`@/public/chess/bpawn.png`).default.src : require(`@/public/chess/wpawn.png`).default.src
        }

        if (piece === "queen") {
            return team === "black" ? require(`@/public/chess/bqueen.png`).default.src : require(`@/public/chess/wqueen.png`).default.src
        }

        if (piece === "rook") {
            return team === "black" ? require(`@/public/chess/brook.png`).default.src : require(`@/public/chess/wrook.png`).default.src
        }
    }

    const initialChessPieces: chessPiece[] = [
        { id: 1, ...chessPieceStatChoices["rook"], currentPos: [0, 0], validSquaresToMove: [], team: "black", image: getChessPieceImage("rook", "black"), movedAmount: 0 },
        { id: 2, ...chessPieceStatChoices["knight"], currentPos: [0, 1], validSquaresToMove: [], team: "black", image: getChessPieceImage("knight", "black"), },
        { id: 3, ...chessPieceStatChoices["bishop"], currentPos: [0, 2], validSquaresToMove: [], team: "black", image: getChessPieceImage("bishop", "black"), },
        { id: 4, ...chessPieceStatChoices["queen"], currentPos: [0, 3], validSquaresToMove: [], team: "black", image: getChessPieceImage("queen", "black"), },
        { id: 5, ...chessPieceStatChoices["king"], currentPos: [0, 4], validSquaresToMove: [], team: "black", image: getChessPieceImage("king", "black"), movedAmount: 0 },
        { id: 6, ...chessPieceStatChoices["bishop"], currentPos: [0, 5], validSquaresToMove: [], team: "black", image: getChessPieceImage("bishop", "black"), },
        { id: 7, ...chessPieceStatChoices["knight"], currentPos: [0, 6], validSquaresToMove: [], team: "black", image: getChessPieceImage("knight", "black"), },
        { id: 8, ...chessPieceStatChoices["rook"], currentPos: [0, 7], validSquaresToMove: [], team: "black", image: getChessPieceImage("rook", "black"), movedAmount: 0 },

        { id: 9, ...chessPieceStatChoices["pawn"], currentPos: [1, 0], validSquaresToMove: [], team: "black", image: getChessPieceImage("pawn", "black"), movedAmount: 0 },
        { id: 10, ...chessPieceStatChoices["pawn"], currentPos: [1, 1], validSquaresToMove: [], team: "black", image: getChessPieceImage("pawn", "black"), movedAmount: 0 },
        { id: 11, ...chessPieceStatChoices["pawn"], currentPos: [1, 2], validSquaresToMove: [], team: "black", image: getChessPieceImage("pawn", "black"), movedAmount: 0 },
        { id: 12, ...chessPieceStatChoices["pawn"], currentPos: [1, 3], validSquaresToMove: [], team: "black", image: getChessPieceImage("pawn", "black"), movedAmount: 0 },
        { id: 13, ...chessPieceStatChoices["pawn"], currentPos: [1, 4], validSquaresToMove: [], team: "black", image: getChessPieceImage("pawn", "black"), movedAmount: 0 },
        { id: 14, ...chessPieceStatChoices["pawn"], currentPos: [1, 5], validSquaresToMove: [], team: "black", image: getChessPieceImage("pawn", "black"), movedAmount: 0 },
        { id: 15, ...chessPieceStatChoices["pawn"], currentPos: [1, 6], validSquaresToMove: [], team: "black", image: getChessPieceImage("pawn", "black"), movedAmount: 0 },
        { id: 16, ...chessPieceStatChoices["pawn"], currentPos: [1, 7], validSquaresToMove: [], team: "black", image: getChessPieceImage("pawn", "black"), movedAmount: 0 },



        { id: 17, ...chessPieceStatChoices["pawn"], currentPos: [6, 0], validSquaresToMove: [], team: "white", image: getChessPieceImage("pawn", "white"), movedAmount: 0 },
        { id: 18, ...chessPieceStatChoices["pawn"], currentPos: [6, 1], validSquaresToMove: [], team: "white", image: getChessPieceImage("pawn", "white"), movedAmount: 0 },
        { id: 19, ...chessPieceStatChoices["pawn"], currentPos: [6, 2], validSquaresToMove: [], team: "white", image: getChessPieceImage("pawn", "white"), movedAmount: 0 },
        { id: 20, ...chessPieceStatChoices["pawn"], currentPos: [6, 3], validSquaresToMove: [], team: "white", image: getChessPieceImage("pawn", "white"), movedAmount: 0 },
        { id: 21, ...chessPieceStatChoices["pawn"], currentPos: [6, 4], validSquaresToMove: [], team: "white", image: getChessPieceImage("pawn", "white"), movedAmount: 0 },
        { id: 22, ...chessPieceStatChoices["pawn"], currentPos: [6, 5], validSquaresToMove: [], team: "white", image: getChessPieceImage("pawn", "white"), movedAmount: 0 },
        { id: 23, ...chessPieceStatChoices["pawn"], currentPos: [6, 6], validSquaresToMove: [], team: "white", image: getChessPieceImage("pawn", "white"), movedAmount: 0 },
        { id: 24, ...chessPieceStatChoices["pawn"], currentPos: [6, 7], validSquaresToMove: [], team: "white", image: getChessPieceImage("pawn", "white"), movedAmount: 0 },

        { id: 25, ...chessPieceStatChoices["rook"], currentPos: [7, 0], validSquaresToMove: [], team: "white", image: getChessPieceImage("rook", "white"), movedAmount: 0 },
        { id: 26, ...chessPieceStatChoices["knight"], currentPos: [7, 1], validSquaresToMove: [], team: "white", image: getChessPieceImage("knight", "white"), },
        { id: 27, ...chessPieceStatChoices["bishop"], currentPos: [7, 2], validSquaresToMove: [], team: "white", image: getChessPieceImage("bishop", "white"), },
        { id: 28, ...chessPieceStatChoices["queen"], currentPos: [7, 3], validSquaresToMove: [], team: "white", image: getChessPieceImage("queen", "white"), },
        { id: 29, ...chessPieceStatChoices["king"], currentPos: [7, 4], validSquaresToMove: [], team: "white", image: getChessPieceImage("king", "white"), movedAmount: 0 },
        { id: 30, ...chessPieceStatChoices["bishop"], currentPos: [7, 5], validSquaresToMove: [], team: "white", image: getChessPieceImage("bishop", "white"), },
        { id: 31, ...chessPieceStatChoices["knight"], currentPos: [7, 6], validSquaresToMove: [], team: "white", image: getChessPieceImage("knight", "white"), },
        { id: 32, ...chessPieceStatChoices["rook"], currentPos: [7, 7], validSquaresToMove: [], team: "white", image: getChessPieceImage("rook", "white"), movedAmount: 0 },
    ]
    const [chessPieces, chessPiecesSet] = useState<chessPiece[]>([...initialChessPieces])

    const [capturedPieces, capturedPiecesSet] = useState<chessPiece[]>([])
    const [tilesBeingAttacked, tilesBeingAttackedSet] = useState<[number, number][]>([])

    const makeNewChessBoard = (seenChessPieces: chessPiece[]) => {
        const newArr: (chessPiece | null)[][] = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ]

        seenChessPieces.forEach(eachChessPiece => {
            newArr[eachChessPiece.currentPos[0]][eachChessPiece.currentPos[1]] = eachChessPiece
        })

        return newArr
    }

    const chessBoardArr = useMemo<(chessPiece | null)[][]>(() => {
        return makeNewChessBoard(chessPieces)
    }, [chessPieces])

    const [activePiece, activePieceSet] = useState<chessPiece | null>(null)

    const blackPiecesCaptured = useMemo(() => {
        let totalPoints = 0

        return [capturedPieces.filter(each => {
            let keepingRecord = false

            if (each.team === "black") {
                totalPoints += each.points
                keepingRecord = true
            }

            return !keepingRecord
        }), totalPoints]

    }, [capturedPieces])

    const whitePiecesCaptured = useMemo(() => {
        let totalPoints = 0

        return [capturedPieces.filter(each => {
            let keepingRecord = false

            if (each.team === "white") {
                totalPoints += each.points
                keepingRecord = true
            }

            return !keepingRecord
        }), totalPoints]

    }, [capturedPieces])

    //make board correct size
    useEffect(() => {
        const smallestPx = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight
        chessBoardRef.current.style.width = `${smallestPx}px`
    }, [])

    //start off
    useEffect(() => {
        if (checkmatedKing) return clearInterval(autoPlayLoop.current)

        if (gameMode === "manual") return clearInterval(autoPlayLoop.current)

        if (chessPieces.length === 2 && chessPieces[0].piece === "king" && chessPieces[1].piece === "king") {
            staleMateSet(true)

            setTimeout(resetAll, 5000);
            return clearInterval(autoPlayLoop.current)
        }

        autoPlayLoop.current = setInterval(() => {
            play(chessPieces)
        }, 800)

        return () => { if (autoPlayLoop.current) clearInterval(autoPlayLoop.current) }
    }, [chessPieces, currentTurn, chessBoardArr, checkmatedKing, gameMode, playerTeamSelection, kingInCheck])

    const play = (passedChessPieces: chessPiece[]) => {
        if (gameMode === "manual") return

        const autoEnemyTeam = playerTeamSelection === "white" ? "black" : "white" //oposite of player selection
        if (gameMode === "verse" && autoEnemyTeam !== currentTurn) {
            return
        }

        let currentTeamPieces = passedChessPieces.filter(eachPiece => eachPiece.team === (gameMode === "auto" ? currentTurn : autoEnemyTeam
        ))

        const rndIndex = Math.floor(Math.random() * currentTeamPieces.length)
        if (currentTeamPieces.length === 0 && !kingInCheck) {
            staleMateSet(true)

            if (autoPlayLoop.current) clearInterval(autoPlayLoop.current)
            console.log(`$nothing more to do`);
            return
        }

        const chosenChessPiece = currentTeamPieces[rndIndex]

        const safeTiles = findValidMoves(chosenChessPiece, chessBoardArr)
        if (safeTiles.length === 0) {
            currentTeamPieces = currentTeamPieces.filter(eachPiece => eachPiece.id !== chosenChessPiece.id)
            play(currentTeamPieces)
            console.log(`$no moves to make on`, chosenChessPiece);
            return
        }

        const rndSafeTileIndex = Math.floor(Math.random() * safeTiles.length)

        activePieceSet(chosenChessPiece)

        setTimeout(() => {
            moveToSquare(chosenChessPiece, safeTiles[rndSafeTileIndex])
        }, 400);
    }

    const checkMove = (option: "front" | "left" | "bottom" | "right" | "topLeft" | "bottomLeft" | "bottomRight" | "topRight", passedChessBoardArr: (chessPiece | null)[][], currentPos: [number, number], team: "black" | "white") => {
        const entireRowOffsetUp = team === "black" ? 1 : -1
        const entireRowOffsetDown = team === "black" ? -1 : 1
        const entireColumnOffsetLeft = team === "black" ? 1 : -1
        const entireColumnOffsetRight = team === "black" ? -1 : 1

        const currentRowPos = currentPos[0]
        const currentColumnPos = currentPos[1]

        if (option === "front") {
            const newRow = currentRowPos + entireRowOffsetUp

            let squareInFront: newSquare = undefined
            if (passedChessBoardArr[newRow]) {
                squareInFront = { state: passedChessBoardArr[newRow][currentColumnPos], position: [newRow, currentColumnPos] }
            }

            return squareInFront
        }

        if (option === "bottom") {
            const newRow = currentRowPos + entireRowOffsetDown

            let squareBehind: newSquare = undefined
            if (passedChessBoardArr[newRow]) {
                squareBehind = { state: passedChessBoardArr[newRow][currentColumnPos], position: [newRow, currentColumnPos] }
            }

            return squareBehind
        }

        if (option === "left") {
            let squareLeft: newSquare = undefined
            const newColumnPos = currentColumnPos + entireColumnOffsetLeft

            if (passedChessBoardArr[currentRowPos][newColumnPos] !== undefined) {
                squareLeft = { state: passedChessBoardArr[currentRowPos][newColumnPos], position: [currentRowPos, newColumnPos] }
            }

            return squareLeft
        }

        if (option === "right") {
            let squareRight: newSquare = undefined
            const newColumnPos = currentColumnPos + entireColumnOffsetRight

            if (passedChessBoardArr[currentRowPos][newColumnPos] !== undefined) {
                squareRight = { state: passedChessBoardArr[currentRowPos][newColumnPos], position: [currentRowPos, newColumnPos] }
            }

            return squareRight
        }

        if (option === "topLeft") {
            const newRow = currentRowPos + entireRowOffsetUp
            const newColumnPos = currentColumnPos + entireColumnOffsetLeft

            let topLeftSquare: newSquare = undefined
            if (passedChessBoardArr[newRow] && passedChessBoardArr[newRow][newColumnPos] !== undefined) {
                topLeftSquare = { state: passedChessBoardArr[newRow][newColumnPos], position: [newRow, newColumnPos] }
            }

            return topLeftSquare
        }

        if (option === "topRight") {
            const newRow = currentRowPos + entireRowOffsetUp
            const newColumnPos = currentColumnPos + entireColumnOffsetRight

            let topRightSquare: newSquare = undefined
            if (passedChessBoardArr[newRow] && passedChessBoardArr[newRow][newColumnPos] !== undefined) {
                topRightSquare = { state: passedChessBoardArr[newRow][newColumnPos], position: [newRow, newColumnPos] }
            }

            return topRightSquare
        }

        if (option === "bottomLeft") {
            const newRow = currentRowPos + entireRowOffsetDown
            const newColumnPos = currentColumnPos + entireColumnOffsetLeft

            let bottomLeftSquare: newSquare = undefined
            if (passedChessBoardArr[newRow] && passedChessBoardArr[newRow][newColumnPos] !== undefined) {
                bottomLeftSquare = { state: passedChessBoardArr[newRow][newColumnPos], position: [newRow, newColumnPos] }
            }

            return bottomLeftSquare
        }

        if (option === "bottomRight") {
            const newRow = currentRowPos + entireRowOffsetDown
            const newColumnPos = currentColumnPos + entireColumnOffsetRight

            let bottomRightSquare: newSquare = undefined
            if (passedChessBoardArr[newRow] && passedChessBoardArr[newRow][newColumnPos] !== undefined) {
                bottomRightSquare = { state: passedChessBoardArr[newRow][newColumnPos], position: [newRow, newColumnPos] }
            }

            return bottomRightSquare
        }
    }

    const findValidMoves = (seenPiece: chessPiece, passedChessBoardArr: (chessPiece | null)[][], justCheck = false, finalCheck = false) => {
        let safeTiles: [number, number][] = []//yx - row column

        if (seenPiece.piece === "pawn") {
            //check front
            const frontTile = checkMove("front", passedChessBoardArr, seenPiece.currentPos, seenPiece.team)
            if (frontTile && frontTile.state === null) {
                safeTiles.push(frontTile.position)
            }

            //check double move
            if (seenPiece.movedAmount === 0 && frontTile) {
                const doubleFrontTile = checkMove("front", passedChessBoardArr, frontTile.position, seenPiece.team)
                if (frontTile.state === null && doubleFrontTile && doubleFrontTile.state === null) {
                    safeTiles.push(doubleFrontTile.position)
                }
            }

            //check topleftDiag
            const topLeft = checkMove("topLeft", passedChessBoardArr, seenPiece.currentPos, seenPiece.team)
            if (topLeft && (topLeft.state && topLeft.state.team !== seenPiece.team)) {
                safeTiles.push(topLeft.position)
            }

            //check topRightDiag
            const topRight = checkMove("topRight", passedChessBoardArr, seenPiece.currentPos, seenPiece.team)
            if (topRight && (topRight.state && topRight.state.team !== seenPiece.team)) {
                safeTiles.push(topRight.position)
            }

            //en pessant check
            if ((seenPiece.currentPos[0] === 3 || seenPiece.currentPos[0] === 4)) {
                const leftTile = checkMove("left", passedChessBoardArr, seenPiece.currentPos, seenPiece.team)
                if (leftTile && topLeft && (leftTile.state && leftTile.state.team !== seenPiece.team && leftTile.state.movedAmount === 1)) {
                    safeTiles.push(topLeft.position)
                    enpassantInPlaySet({
                        position: topLeft.position,
                        pieceToCollect: leftTile.state
                    })
                }

                const rightTile = checkMove("right", passedChessBoardArr, seenPiece.currentPos, seenPiece.team)
                if (rightTile && topRight && (rightTile.state && rightTile.state.team !== seenPiece.team && rightTile.state.movedAmount === 1)) {
                    safeTiles.push(topRight.position)
                    enpassantInPlaySet({
                        position: topRight.position,
                        pieceToCollect: rightTile.state
                    })
                }
            }
        }

        if (seenPiece.piece === "rook") {
            recuriveFrontCheck(seenPiece.currentPos)
            recuriveBottomCheck(seenPiece.currentPos)
            recuriveLeftCheck(seenPiece.currentPos)
            recuriveRightCheck(seenPiece.currentPos)
        }

        if (seenPiece.piece === "bishop") {
            recuriveTopLeftCheck(seenPiece.currentPos)
            recuriveTopRightCheck(seenPiece.currentPos)
            recuriveBottomLeftCheck(seenPiece.currentPos)
            recuriveBottomRightCheck(seenPiece.currentPos)
        }

        if (seenPiece.piece === "queen") {
            recuriveFrontCheck(seenPiece.currentPos)
            recuriveBottomCheck(seenPiece.currentPos)
            recuriveLeftCheck(seenPiece.currentPos)
            recuriveRightCheck(seenPiece.currentPos)
            recuriveTopLeftCheck(seenPiece.currentPos)
            recuriveTopRightCheck(seenPiece.currentPos)
            recuriveBottomLeftCheck(seenPiece.currentPos)
            recuriveBottomRightCheck(seenPiece.currentPos)
        }

        if (seenPiece.piece === "knight") {
            //do eight checks from current position
            //check undefined null or here
            const knightMovementArr = [[-1, -2], [-2, -1], [-2, 1], [-1, 2], [1, -2], [2, -1], [2, 1], [1, 2]]
            const currentPosY = seenPiece.currentPos[0]
            const currentPosX = seenPiece.currentPos[1]

            knightMovementArr.forEach(movePair => {
                const newRow = currentPosY + movePair[0]
                const newColumn = currentPosX + movePair[1]

                if (passedChessBoardArr[newRow] && passedChessBoardArr[newRow][newColumn] !== undefined) {
                    const square = passedChessBoardArr[newRow][newColumn]

                    if (square === null || square.team !== seenPiece.team) {
                        safeTiles.push([newRow, newColumn])
                    }
                }
            })
        }

        if (seenPiece.piece === "king") {
            //do eight checks from current position
            //check undefined null or here
            const kingMovementArr = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
            const currentPosY = seenPiece.currentPos[0]
            const currentPosX = seenPiece.currentPos[1]

            kingMovementArr.forEach(movePair => {
                const newRow = currentPosY + movePair[0]
                const newColumn = currentPosX + movePair[1]

                if (passedChessBoardArr[newRow] && passedChessBoardArr[newRow][newColumn] !== undefined) {
                    const square = passedChessBoardArr[newRow][newColumn]

                    if (square === null || square.team !== seenPiece.team) {
                        safeTiles.push([newRow, newColumn])
                    }
                }
            })

            if (seenPiece.movedAmount === 0) {
                const whiteLeftRook = chessPieces.find(eachPiece => eachPiece.id === 25)
                const whiteRightRook = chessPieces.find(eachPiece => eachPiece.id === 32)
                const blackLeftRook = chessPieces.find(eachPiece => eachPiece.id === 1)
                const blackRightRook = chessPieces.find(eachPiece => eachPiece.id === 8)

                if (seenPiece.team === "white" && whiteLeftRook && whiteLeftRook.movedAmount === 0) {
                    //y x
                    const positionsClearCheck1 = passedChessBoardArr[seenPiece.currentPos[0]][seenPiece.currentPos[1] - 1]
                    const positionsClearCheck2 = passedChessBoardArr[seenPiece.currentPos[0]][seenPiece.currentPos[1] - 2]
                    const positionsClearCheck3 = passedChessBoardArr[seenPiece.currentPos[0]][seenPiece.currentPos[1] - 3]

                    if (positionsClearCheck1 === null && positionsClearCheck2 === null && positionsClearCheck3 === null) {
                        canCastleSet(prev => {
                            const newArr = [...prev]
                            let newPositionY = whiteLeftRook.currentPos[0]
                            let newPositionX = whiteLeftRook.currentPos[1] + 1

                            safeTiles.push([newPositionY, newPositionX])

                            newArr.push({
                                pieceToCollect: whiteLeftRook,
                                position: [newPositionY, newPositionX]
                            })


                            return newArr
                        })
                    }

                }

                if (seenPiece.team === "white" && whiteRightRook && whiteRightRook.movedAmount === 0) {

                    const positionsClearCheck1 = passedChessBoardArr[seenPiece.currentPos[0]][seenPiece.currentPos[1] + 1]
                    const positionsClearCheck2 = passedChessBoardArr[seenPiece.currentPos[0]][seenPiece.currentPos[1] + 2]

                    if (positionsClearCheck1 === null && positionsClearCheck2 === null) {
                        canCastleSet(prev => {
                            const newArr = [...prev]
                            let newPositionY = whiteRightRook.currentPos[0]
                            let newPositionX = whiteRightRook.currentPos[1] - 1

                            safeTiles.push([newPositionY, newPositionX])

                            newArr.push({
                                pieceToCollect: whiteRightRook,
                                position: [newPositionY, newPositionX]
                            })


                            return newArr
                        })
                    }
                }

                if (seenPiece.team === "black" && blackLeftRook && blackLeftRook.movedAmount === 0) {
                    const positionsClearCheck1 = passedChessBoardArr[seenPiece.currentPos[0]][seenPiece.currentPos[1] - 1]
                    const positionsClearCheck2 = passedChessBoardArr[seenPiece.currentPos[0]][seenPiece.currentPos[1] - 2]
                    const positionsClearCheck3 = passedChessBoardArr[seenPiece.currentPos[0]][seenPiece.currentPos[1] - 3]

                    if (positionsClearCheck1 === null && positionsClearCheck2 === null && positionsClearCheck3 === null) {
                        canCastleSet(prev => {
                            const newArr = [...prev]
                            let newPositionY = blackLeftRook.currentPos[0]
                            let newPositionX = blackLeftRook.currentPos[1] + 1

                            safeTiles.push([newPositionY, newPositionX])

                            newArr.push({
                                pieceToCollect: blackLeftRook,
                                position: [newPositionY, newPositionX]
                            })


                            return newArr
                        })
                    }
                }

                if (seenPiece.team === "black" && blackRightRook && blackRightRook.movedAmount === 0) {
                    const positionsClearCheck1 = passedChessBoardArr[seenPiece.currentPos[0]][seenPiece.currentPos[1] + 1]
                    const positionsClearCheck2 = passedChessBoardArr[seenPiece.currentPos[0]][seenPiece.currentPos[1] + 2]

                    if (positionsClearCheck1 === null && positionsClearCheck2 === null) {
                        canCastleSet(prev => {
                            const newArr = [...prev]
                            let newPositionY = blackRightRook.currentPos[0]
                            let newPositionX = blackRightRook.currentPos[1] - 1

                            safeTiles.push([newPositionY, newPositionX])

                            newArr.push({
                                pieceToCollect: blackRightRook,
                                position: [newPositionY, newPositionX]
                            })


                            return newArr
                        })
                    }
                }
            }
        }

        if (justCheck) return [...safeTiles]

        // check safe tiles positions to see if the king is in check
        let kingIsInCheck = false
        safeTiles = safeTiles.filter(eachXYPos => {
            kingIsInCheck = checkIfKingIsInCheck([...eachXYPos], { ...seenPiece })
            return !kingIsInCheck
        })

        if (finalCheck) return [...safeTiles] //end list of truly safe tiles

        //handle click on invalid move piece if king is in check
        if (safeTiles.length === 0 && kingIsInCheck && gameMode !== "auto" && currentTurn === playerTeamSelection) toast.error("Can't Move this piece. King is in check")

        //aply valid moves to piece
        chessPiecesSet(prevChessPieces => {
            const newChessPieces = prevChessPieces.map(eachChessPiece => {
                if (eachChessPiece.id === seenPiece.id) {
                    eachChessPiece.validSquaresToMove = [...safeTiles]
                }

                return eachChessPiece
            })

            return newChessPieces
        })

        //small functions
        function recuriveFrontCheck(passedPosition: [number, number]) {
            const frontTile = checkMove("front", passedChessBoardArr, passedPosition, seenPiece.team)
            if (!frontTile) return

            if (frontTile.state === null) {
                safeTiles.push(frontTile.position)
                recuriveFrontCheck(frontTile.position)

            } else if (frontTile.state && frontTile.state.team !== seenPiece.team) {
                safeTiles.push(frontTile.position)
            }
        }
        function recuriveBottomCheck(passedPosition: [number, number]) {
            const bottomTile = checkMove("bottom", passedChessBoardArr, passedPosition, seenPiece.team)
            if (!bottomTile) return

            if (bottomTile.state === null) {
                safeTiles.push(bottomTile.position)
                recuriveBottomCheck(bottomTile.position)

            } else if (bottomTile.state && bottomTile.state.team !== seenPiece.team) {
                safeTiles.push(bottomTile.position)
            }
        }
        function recuriveLeftCheck(passedPosition: [number, number]) {
            const leftTile = checkMove("left", passedChessBoardArr, passedPosition, seenPiece.team)
            if (!leftTile) return

            if (leftTile.state === null) {
                safeTiles.push(leftTile.position)
                recuriveLeftCheck(leftTile.position)

            } else if (leftTile.state && leftTile.state.team !== seenPiece.team) {
                safeTiles.push(leftTile.position)
            }
        }
        function recuriveRightCheck(passedPosition: [number, number]) {
            const rightTile = checkMove("right", passedChessBoardArr, passedPosition, seenPiece.team)
            if (!rightTile) return

            if (rightTile.state === null) {
                safeTiles.push(rightTile.position)
                recuriveRightCheck(rightTile.position)

            } else if (rightTile.state && rightTile.state.team !== seenPiece.team) {
                safeTiles.push(rightTile.position)
            }
        }
        function recuriveTopLeftCheck(passedPosition: [number, number]) {
            const topLeftTile = checkMove("topLeft", passedChessBoardArr, passedPosition, seenPiece.team)
            if (!topLeftTile) return

            if (topLeftTile.state === null) {
                safeTiles.push(topLeftTile.position)
                recuriveTopLeftCheck(topLeftTile.position)

            } else if (topLeftTile.state && topLeftTile.state.team !== seenPiece.team) {
                safeTiles.push(topLeftTile.position)
            }
        }
        function recuriveTopRightCheck(passedPosition: [number, number]) {
            const topRightTile = checkMove("topRight", passedChessBoardArr, passedPosition, seenPiece.team)
            if (!topRightTile) return

            if (topRightTile.state === null) {
                safeTiles.push(topRightTile.position)
                recuriveTopRightCheck(topRightTile.position)

            } else if (topRightTile.state && topRightTile.state.team !== seenPiece.team) {
                safeTiles.push(topRightTile.position)
            }
        }
        function recuriveBottomLeftCheck(passedPosition: [number, number]) {
            const bottomLeftTile = checkMove("bottomLeft", passedChessBoardArr, passedPosition, seenPiece.team)
            if (!bottomLeftTile) return

            if (bottomLeftTile.state === null) {
                safeTiles.push(bottomLeftTile.position)
                recuriveBottomLeftCheck(bottomLeftTile.position)

            } else if (bottomLeftTile.state && bottomLeftTile.state.team !== seenPiece.team) {
                safeTiles.push(bottomLeftTile.position)
            }
        }
        function recuriveBottomRightCheck(passedPosition: [number, number]) {
            const bottomRightTile = checkMove("bottomRight", passedChessBoardArr, passedPosition, seenPiece.team)
            if (!bottomRightTile) return

            if (bottomRightTile.state === null) {
                safeTiles.push(bottomRightTile.position)
                recuriveBottomRightCheck(bottomRightTile.position)

            } else if (bottomRightTile.state && bottomRightTile.state.team !== seenPiece.team) {
                safeTiles.push(bottomRightTile.position)
            }
        }

        return safeTiles
    }

    const moveToSquare = (seenPiece: chessPiece, posYX: [number, number], dontSwitchTurn = false) => {
        //check if capturing a piece
        const checkedPiece = chessBoardArr[posYX[0]][posYX[1]]
        if (checkedPiece !== null && checkedPiece.team !== seenPiece.team) {
            capturePiece(checkedPiece)
        }

        if (enpassantInPlay) {
            if (enpassantInPlay.position[0] === posYX[0] && enpassantInPlay.position[1] === posYX[1]) {
                capturePiece(enpassantInPlay.pieceToCollect)
            }
            enpassantInPlaySet(undefined)
        }

        if (canCastle.length > 0 && !dontSwitchTurn) {
            canCastle.forEach(eachCastleObj => {

                if (eachCastleObj.position[0] === posYX[0] && eachCastleObj.position[1] === posYX[1]) {
                    if (eachCastleObj.pieceToCollect.id === 25) {
                        const newYPos = eachCastleObj.pieceToCollect.currentPos[0]
                        const newXPos = eachCastleObj.pieceToCollect.currentPos[1] + 2

                        moveToSquare(eachCastleObj.pieceToCollect, [newYPos, newXPos], true)
                    }

                    if (eachCastleObj.pieceToCollect.id === 32) {
                        const newYPos = eachCastleObj.pieceToCollect.currentPos[0]
                        const newXPos = eachCastleObj.pieceToCollect.currentPos[1] - 2

                        moveToSquare(eachCastleObj.pieceToCollect, [newYPos, newXPos], true)
                    }


                    if (eachCastleObj.pieceToCollect.id === 1) {
                        const newYPos = eachCastleObj.pieceToCollect.currentPos[0]
                        const newXPos = eachCastleObj.pieceToCollect.currentPos[1] + 2

                        moveToSquare(eachCastleObj.pieceToCollect, [newYPos, newXPos], true)
                    }


                    if (eachCastleObj.pieceToCollect.id === 8) {
                        const newYPos = eachCastleObj.pieceToCollect.currentPos[0]
                        const newXPos = eachCastleObj.pieceToCollect.currentPos[1] - 2

                        moveToSquare(eachCastleObj.pieceToCollect, [newYPos, newXPos], true)
                    }
                }
            })


            canCastleSet([])
        }

        //write piece to new position
        chessPiecesSet(prevChessPieces => {
            const newChessPieces = JSON.parse(JSON.stringify(prevChessPieces)) as chessPiece[]

            //get latest positions to chesspieces
            return newChessPieces.map(eachPiece => {
                if (eachPiece.id === seenPiece.id) {
                    eachPiece.currentPos = posYX
                    if (eachPiece.movedAmount !== undefined) eachPiece.movedAmount += 1

                    checkPromotion(eachPiece)
                    return eachPiece
                }


                return eachPiece
            })
        })

        if (dontSwitchTurn) return
        currentTurnSet(prevTurn => {
            const currentPlay = seenPiece.team

            let newTurn: "black" | "white" = "black"

            if (currentPlay === "white") {
                newTurn = "black"
            } else {
                newTurn = "white"
            }

            return newTurn
        })
    }

    const checkPromotion = (seenPiece: chessPiece) => {
        if (seenPiece.piece !== "pawn") return

        const promotionOptions = ["rook", "knight", "bishop", "queen"]
        const randPromoIndex = Math.floor(Math.random() * promotionOptions.length)

        if (seenPiece.team === "white") {
            if (seenPiece.currentPos[0] === 0) {
                //promotion time
                makeChanges(seenPiece)
            }
        } else {
            //promotion time
            //black promotion
            if (seenPiece.currentPos[0] === 7) {
                makeChanges(seenPiece)
            }
        }

        function makeChanges(seenPiece: chessPiece) {
            //promotion time
            chessPiecesSet(prevPieces => {
                return prevPieces.map(eachPiece => {
                    if (eachPiece.id === seenPiece.id) {
                        const newPieceStats = chessPieceStatChoices[promotionOptions[randPromoIndex]]
                        eachPiece = { ...eachPiece, ...newPieceStats, image: getChessPieceImage(newPieceStats.piece, seenPiece.team) }
                    }

                    return eachPiece
                })
            })
        }
    }

    const capturePiece = (seenPiece: chessPiece) => {
        chessPiecesSet(prev => {
            return prev.filter(eachChessPiece => eachChessPiece.id !== seenPiece.id)
        })

        capturedPiecesSet(prev => {
            const newArr = [...prev, seenPiece]
            return newArr
        })
    }

    const checkIfKingIsInCheck = (position: [number, number], seenChessPiece: chessPiece): boolean => {
        //update positions of chess pieces
        const chessPiecesLocal = (JSON.parse(JSON.stringify(chessPieces)) as chessPiece[]).filter(eachPiece => {
            let returning = true

            if (eachPiece.currentPos[0] === position[0] && eachPiece.currentPos[1] === position[1]) {
                returning = false
            }

            return returning
        }).map(eachPiece => {
            if (eachPiece.id === seenChessPiece.id) {
                eachPiece.currentPos = [...position]
            }

            return eachPiece
        })

        //get new chess board at hypothetical position
        const newChessBoard = makeNewChessBoard(chessPiecesLocal)

        //get kings from board
        const king = chessPiecesLocal.find(eachPiece => eachPiece.piece === "king" && eachPiece.team === seenChessPiece.team)
        if (!king) return false

        //get tile positions that attack the kings
        let tilesBeingAttacked: [number, number][] = []
        chessPiecesLocal.forEach(eachChessPiece => {
            if (eachChessPiece.team !== seenChessPiece.team) {
                const seenTiles = findValidMoves({ ...eachChessPiece }, newChessBoard, true)

                if (seenTiles) tilesBeingAttacked.push(...seenTiles)
            }
        })
        tilesBeingAttackedSet(tilesBeingAttacked)

        //check if king attacked
        let kingBeingAttacked = false
        kingInCheckSet(false)
        tilesBeingAttacked.forEach(attackYX => {
            const positionYAttacked = attackYX[0]
            const positionXAttacked = attackYX[1]

            if (positionYAttacked === king.currentPos[0] && positionXAttacked === king.currentPos[1]) {
                kingBeingAttacked = true
                kingInCheckSet(true)
                // console.log(`$king would be in check, cant move piece`);
            }
        })

        if (kingBeingAttacked && !checkingFinalMovesLeft.current) {
            checkingFinalMovesLeft.current = true

            //check my team for any possible moves
            let movesLeft = false
            chessPiecesLocal.forEach(eachChessPiece => {
                if (eachChessPiece.team === seenChessPiece.team) {
                    const seenTiles = findValidMoves({ ...eachChessPiece }, newChessBoard, false, true)

                    if (seenTiles && seenTiles.length > 0) movesLeft = true
                }
            })

            console.log(`$king being attacked`, king);
            console.log(`$are moves left`, movesLeft);

            checkingFinalMovesLeft.current = false
            if (!movesLeft) {
                toast.error("checkmated")
                checkmatedKingSet(king)
            }
        }


        return kingBeingAttacked
    }

    //set up an autoplayer
    const handleInteractions = (passedSquare: chessPiece | null, isValidSquare: boolean, posYX: [number, number]) => {
        if (passedSquare && !activePiece) {
            if (currentTurn === passedSquare.team) {
                findValidMoves(passedSquare, chessBoardArr)
                activePieceSet(passedSquare)
            } else {
                toast.success(`${currentTurn}'s play`)
            }
        }

        if (activePiece) {
            if (isValidSquare) {
                moveToSquare(activePiece, posYX)
            }

            activePieceSet(null)
        }
    }

    const resetAll = () => {
        if (checkmatedKing) checkmatedKingSet(undefined)

        if (staleMate) staleMateSet(false)

        chessPiecesSet([...initialChessPieces])
        capturedPiecesSet([])
    }

    return (
        <HideNav>
            <div style={{ display: "grid", gridTemplateColumns: "1rem auto auto" }}>
                <div style={{ display: "grid", gridTemplateRows: `${whitePiecesCaptured[1] === 0 ? 0.5 : whitePiecesCaptured[1]}fr ${blackPiecesCaptured[1] === 0 ? 0.5 : blackPiecesCaptured[1]}fr` }}>
                    <div style={{ backgroundColor: "purple" }}></div>
                    <div style={{ backgroundColor: "gold" }}></div>
                </div>

                <div>
                    {checkmatedKing && (
                        <div>
                            {checkmatedKing.team === "white" ? (
                                <p>Black is our winner</p>
                            ) : (
                                <p>White is our winner</p>
                            )}
                        </div>
                    )}

                    {staleMate && (
                        <div>
                            <p>Draw</p>
                        </div>
                    )}

                    <div className={styles.chessBoard} ref={chessBoardRef}>
                        {chessBoardArr.map((eachRowArr, eachRowArrIndex) => {
                            return eachRowArr.map((eachSquare, eachSquareIndex) => {
                                let validSquareToMove = false

                                activePiece?.validSquaresToMove.forEach(eachPos => {
                                    //yx

                                    if (eachPos[0] === eachRowArrIndex && eachPos[1] === eachSquareIndex) {
                                        validSquareToMove = true
                                    }
                                })

                                let foundInArr = false
                                tilesBeingAttacked.forEach((eachAddress) => {
                                    if (eachAddress[0] === eachRowArrIndex && eachAddress[1] === eachSquareIndex) {
                                        foundInArr = true
                                    }
                                })

                                return (
                                    <div key={`row${eachRowArrIndex}column${eachSquareIndex}`}
                                        style={{ backgroundColor: validSquareToMove ? "orange" : "", color: eachSquare && eachSquare.team === "black" ? "purple" : "", }}
                                        className={`${styles.chessSquare} ${eachRowArrIndex % 2 === 0 ? eachSquareIndex % 2 === 0 ? styles.lightSquare : styles.darkSquare : eachSquareIndex % 2 === 0 ? styles.darkSquare : styles.lightSquare}`}
                                        onClick={() => {
                                            //select an item
                                            //move an item if active chess piece is there and valid move
                                            handleInteractions(eachSquare, validSquareToMove, [eachRowArrIndex, eachSquareIndex])
                                        }}
                                    >
                                        {eachSquare && <Image alt={`${eachSquare.piece} img`} priority={true} src={eachSquare.image} width={60} height={60} style={{ objectFit: "contain" }} />}
                                    </div>
                                )
                            })
                        })}
                    </div>
                </div>

                <div>
                    <div style={{ position: "relative" }}>
                        <div onClick={() => { showingSettingsSet(prev => !prev) }}>
                            <svg style={{ width: "1.5rem", marginBlock: "1rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" /></svg>
                        </div>

                        <div style={{ display: !showingSettings ? "none" : "grid", position: "absolute", right: 0, backgroundColor: "rgb(var(--color1))", padding: "1rem", whiteSpace: "nowrap", gap: "1rem", justifyItems: "center" }}>
                            <p>Set GameMode To</p>

                            <button onClick={() => gameModeSet("auto")}>Auto</button>
                            <button onClick={() => gameModeSet("manual")}>Manual</button>
                            <button onClick={() => gameModeSet("verse")}>Verse</button>

                            <div style={{ display: "grid", gap: "1rem", justifyItems: "center" }}>
                                {playerTeamSelection === "white" ? (
                                    <>
                                        <p>Player Team White</p>
                                        <button onClick={() => playerTeamSelectionSet("black")}>Switch</button>
                                    </>
                                ) : (
                                    <>
                                        <p>Player Team Black</p>
                                        <button onClick={() => playerTeamSelectionSet("white")}>Switch</button>
                                    </>
                                )}
                            </div>

                            <button onClick={resetAll}>Reset Game</button>
                        </div>
                    </div>

                </div>
            </div>
        </HideNav>
    )
}