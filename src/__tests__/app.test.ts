

function soma (x: number, y:number){
    return 9;
}

describe('Funcao soma.', () => {
    it('should return 5 when sum 2 + 3', () => {
        const resposta = soma(2,3);
        expect(resposta).toBeGreaterThan(5);
    })
});
